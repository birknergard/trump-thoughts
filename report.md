Features:
View trump thoughts (GET),
Updates in real time,
Filter by topic, tone, searchquery(title) or any combination of the three. (GetByTopic, GetByTone, GetByTopicAndTone)
Modify existing thoughts(with the exception of imagefile). (PUT)
Delete thoughts (DELETE)

Create new thoughts (POST) with image.
Shows an active preview during creation.
Progress is saved. (TextFields saved via localstorage, image is saved via API.)
Responsive design. (CSS Grid layout and media queries, defined in App.css)

Note: rather than making a ton of fragile features, ive kept the feature list low and attempted to keep them robust and bug-resistant.

Usability:
Every clickable element has some indicator that defines it as such (icon, hover, visual style).
State is communicated to the user where it is possible. Every input element has placeholders, placeholders reset when input is.
Site is usable on mobile, tablet and every screen size. On smaller sizes fonts are kept at a readable size (minimum font size: 16).