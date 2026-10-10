# Personal Portfolio

A five-page portfolio frontend built with HTML5, CSS3, and vanilla JavaScript. It runs locally in a browser and requires no backend.

## Pages

- `index.html` — Home
- `about.html` — Background and education
- `projects.html` — Searchable and filterable project gallery
- `resume.html` — Resume content and print-to-PDF action
- `contact.html` — Validated contact form using a `mailto:` link

## Run

Keep the files in the folder structure shown in the project instructions. Open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Personalize before publishing

Replace the sample name, initials, location, education, interests, project descriptions, technologies, and email in the HTML files. Update page titles and meta descriptions as needed. Remove project placeholders and only add working links for real repositories or live demos.

The contact form does not send or store data. After validation, it opens the visitor's email application with a prefilled message. Set the email address in `contact.html` to an address you control.

## Add a project

In `projects.html`, duplicate a `.project-card`, update its text and `data-category`, and set `data-search` to relevant keywords. Use one of the existing categories (`web`, `algorithms`, `other`) or add a matching filter button.

## Images

The current profile and project visuals are CSS placeholders. To use your own images, add them under `assets/images/` and replace a placeholder with an `<img>` element and descriptive `alt` text.

## Manual testing checklist

- Open each page and use every navigation link.
- At mobile width, open and close the menu and press Escape.
- On Projects, test each category, search, combined filtering, clear search, no results, and project details.
- On Resume, activate Print / Save PDF.
- On Contact, submit empty fields, invalid email, short message, and valid data.
- Test keyboard navigation and visible focus.
- Check the layout at mobile, tablet, and desktop widths.
- Confirm there are no placeholder personal claims or fake external links before publishing.