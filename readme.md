# Mailgun Liquid API

> Mailgun Liquid API sends Liquid templates via Mailgun. Easy.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/shortlist-digital/mailgun-liquid-api)

MLA will reconcile a JSON `payload` object `POST`'d to the `/send` endpoint, with a [Liquid compatible](http://shopify.github.io/liquid/basics/introduction/) HTML email template.

The template should be hosted at a public URL and referenced via a `LIQUID_TEMPLATE_URL` environment variable.

## Development

MLA uses [Backpack](github.com/jaredpalmer/backpack) for development. To get going you will need a template and a mailgun config.

```
cp .example.env .env
// Update .env with Mailgun credentials and template location
npm run dev
```

You can view the template MLA has downloaded by visiting `/template` in your browser.

## Production deployment

To run in production. Make sure your environment variables are configured and then:

```
npm run build
node build/main.js
```

## Mailgun configuration

Mailgun configuration is handled though  environment variables:

```env
MAILGUN_USERNAME=foo@bar.com
MAILGUN_PASSWORD=abcd1234
MAILGUN_FROM_ADDRESS="Human Readable <machine-readable@test.com>"
# Optional default subject line
MAILGUN_SUBJECT_LINE="Here's your thing you were expecting"
```

## Template configuration

On boot, MLA will download the Liquid compatible HTML template file from a remote location, configure it through the environment variable:

```env
LIQUID_TEMPLATE_URL=https://bucket.s3.amazonaws.com/voucher/email-template.html
```

## Usage

When your MLA app is configured and running. Your application should send a JSON payload to the `/send` endpoint.

All properties of the payload will be passed into the Liquid template at render.

The following payload fields are required in order to send the email successfully:

### Required payload fields

```js
{
  "emailAddress": "foo@bar.com",
  "emailSubject": "Read this email",
}
```

If your email subject is not dynamic, you may also set the email subject through the `MAILGUN_SUBJECT_LINE` env variable.

### Example payload

```js
{
  "emailAddress": "foo@bar.com",
  "emailSubject": "Read this email",
  "firstName": "Emery",
  "secondName": "Adan",
  "loyaltyPoints": "1200",
  "loyaltyStatusIcon": "https://test.com/images/icons/loyalty/super-custom.jpg"
}
```

In the above example, the first two fields are used in render, *and* for sending the email via mailgun.

The rest of the fields are used by Liquid to render the `HTML` of the email itself.

### Contributing

Pull requests are welcome

