import { revalidateTag } from 'next/cache'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

/**
 * Sanity-webhook → revalideert de 'sanity'-cache-tag zodat wijzigingen
 * in de Studio direct live komen (i.p.v. na het ISR-venster van 60s).
 *
 * Instellen in sanity.io/manage → API → Webhooks:
 *   URL:     https://<domein>/api/revalidate
 *   Trigger: Create / Update / Delete
 *   Secret:  zelfde waarde als SANITY_REVALIDATE_SECRET
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return Response.json(
      { message: 'SANITY_REVALIDATE_SECRET ontbreekt' },
      { status: 500 },
    )
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: 'Ongeldige signature' }, { status: 401 })
  }

  revalidateTag('sanity')
  return Response.json({ revalidated: true, now: Date.now() })
}
