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

## Template configuration

On boot, MLA will download the Liquid compatible HTML template file from a remote location, configure it through the environment variable:

```env
LIQUID_TEMPLATE_URL=https://slm-digital.s3.amazonaws.com/voucher-templates/chicken-wing-day-voucher.html
```

## Required payload fields

```js
{
  "emailAddress": "foo@bar.com",
  "emailSubject": "Read this email",
  "htmlString": "<html>Liquid Compatible HTML string</html>"
}
```



