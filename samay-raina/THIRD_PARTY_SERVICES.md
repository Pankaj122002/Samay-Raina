# Third-Party Services

## Form Submissions (EmailJS)

This site uses **EmailJS** for frontend-only form submissions. No backend or database is required.

### How It Works

1. User fills out the form on the website
2. EmailJS sends the form data directly to the admin email address
3. No data is stored on any server — it goes straight to email

### Setup Instructions

1. Go to https://www.emailjs.com/ and create a free account
2. Create an Email Service (Gmail, Outlook, or EmailJS default)
3. Create two Email Templates:
   - **Participant Application Template** — for `/apply/participant`
   - **Audience Registration Template** — for `/apply/audience`
4. In each template, use these variable names:

#### Participant Template Variables
```
{{fullName}}, {{email}}, {{whatsapp}}, {{stateOfBirth}}, {{cityOfBirth}},
{{stateOfResidence}}, {{cityOfResidence}}, {{dateOfBirth}}, {{gender}},
{{latent}}, {{whySelect}}, {{youtubeLinks}}, {{interestingFacts}},
{{instagram}}, {{youtube}}, {{snapchat}}, {{twitter}}
```

#### Audience Template Variables
```
{{fullName}}, {{email}}, {{whatsapp}}, {{state}}, {{city}},
{{dateOfBirth}}, {{gender}}
```

5. Copy your Service ID, Template IDs, and Public Key to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_PARTICIPANT=your_participant_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUDIENCE=your_audience_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Fallback

If EmailJS is not configured, forms will show an error message asking users to try again or contact directly. The form validation still works without EmailJS.

## Fonts

- **Inter**: Loaded via `next/font/google` (self-hosted, no third-party requests)
- **Clash Display**: Loaded from CDNFonts (https://fonts.cdnfonts.com)

## Analytics (Optional)

- **Vercel Analytics**: Built-in, zero-config on Vercel deployments
- **Plausible**: Privacy-friendly alternative, add script tag to layout

## Social Media

All social links are static anchor tags. No API integrations.
