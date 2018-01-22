# Mailgun Liquid API

> Mailgun Liquid API sends Liquid templates via Mailgun. Easy.

MLA will reconcile a JSON `payload` object `POST`'d to the `/send` endpoint, with a [Liquid compatible](http://shopify.github.io/liquid/basics/introduction/) HTML email template.

The template should be hosted at a public URL and referenced via a `LIQUID_TEMPLATE_URL` environment variable.

## Mailgun configuration

Mailgun configuration is handled though  environment variables:

```env
MAILGUN_USERNAME=foo@bar.com
MAILGUN_PASSWORD=abcd1234
MAILGUN_FROM_ADDRESS="Human Readable <machine-readable@test.com>"
```

## Required payload fields

```js
{
  "emailAddress": "foo@bar.com",
  "emailSubject": "Read this email",
  "htmlString": "<html>Liquid Compatible HTML string</html>"
}
```



