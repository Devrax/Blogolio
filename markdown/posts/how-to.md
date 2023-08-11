---
title: Self-hosting Fonts from Google Fonts
description: Most Google APIs are infamous for recording user data in some shape or form. The General Data Protection Regulation (GDPR) is the world’s most stringent privacy and security regulation.
image: https://ucarecdn.com/ef84989b-f7bc-4252-b98b-9c6c7a5b5550/
author: Rafael Mejia
created_at: 2023-08-08T02:21:50.400Z
modified_at: 2023-08-08T02:21:50.400Z
---


![GDPR-Drake-meme](https://ucarecdn.com/ef84989b-f7bc-4252-b98b-9c6c7a5b5550/)

index
1. [Downloading the wanted font](#downloading-the-wanted-font)
2. [Preparing your fonts to be used in your website](#preparing-your-fonts-to-be-used-in-your-website)
3. [Using your news font-face in your project](#using-your-news-font-face-in-your-project)


When it comes to privacy, most Google APIs are explicitly known to store user's data in some shape or form, and some kind of recording are illegal by the *[GDPR](https://gdpr.eu/what-is-gdpr/)* the EU’s data protection law, in cases where users are not aware of which data is being sent to third-parties to provide some kind of analytics or service, here we are talking precisely about *[Google Fonts](https://fonts.google.com/)*

> An example of this law being enforced due to lack of awareness about this: [German Court Rules Websites Embedding Google Fonts Violates GDPR](https://thehackernews.com/2022/01/german-court-rules-websites-embedding.html)

Knowing the problem, let's look at one solution, **Self-hosting those fonts ourselves**.

Gladly, Google Fonts provides some fonts with certain use limitations to be downloaded from their servers.

### Downloading the wanted font

Go to [Google Fonts](https://fonts.google.com/) and look for the font you want to download, in my case I will download Montserrat's font-family
![Montserrat](https://ucarecdn.com/ba7af2d5-5c47-4073-b75f-6e3281f86b65/ "title")

> Be sure to before downloading, you read about font's license, in my case Montserrat's license is under the [Open Font License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
![Montserrat's license](https://ucarecdn.com/b44219d6-6f64-4c96-91ba-1cee27b781dc/)

Now that we have our target font, we can download the font just clicking the "Download family" button.

![Montserrat download](https://ucarecdn.com/dfa94045-35c4-4e5d-b380-ab13726a1d3c/)

After that we need to unzip it, lookup for the uncompressed font, and you must end with something like this:

![Unzip font file](https://ucarecdn.com/05803f26-1339-4cd7-9db7-60ff9aa429c0/)

### Preparing your fonts to be used in your website

Now let's prepare the fonts, in the `/static` folder select the font weights and style required for your project, in my case, I will take two, `Montserrat-Regular.ttf` and `Montserrat-Black.ttf` and use this web-font generator called [transfonter](https://transfonter.org/), there click the button called `Add fonts` and let the default font settings as it is, if you don't have a custom specification for those fonts, and click the `convert` button next to `Add fonts`.

![Transfonter](https://ucarecdn.com/a6e2048d-b55f-4b13-864b-95cf0212c535/)

You can preview the converted fonts, but for this case you going to download it, and ended up with a zip file, unzip it and you'll see several files, everything there is going to be needed but `demo.html`, if you want can get rid of it, inside the `stylesheets.css`  file you will see (Using my example above with regular and black), two `@font-face` setting up the fonts that will be used for your website.

```css
@font-face {
    font-family: 'Montserrat';
    src: url('Montserrat-Regular.woff2') format('woff2'),
        url('Montserrat-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Montserrat';
    src: url('Montserrat-Black.woff2') format('woff2'),
        url('Montserrat-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

```

Remember, for your project, everything but `demo.html` will be required, if you put your fonts in another folder apart from `stylesheets.css`, you must modify the path used in the `url(...)` css function to spot your fonts files.

### Using your news font face in your project

For this, you have to be aware that if your are using a framework it might vary depending on your framework's assets manipulation, in order for you framework to serve your fonts in the specified location, that way your `stylesheets.css` can spot those fonts.

But let's no complicated this process, and let's use the same demo downloaded from [transfonter](https://transfonter.org/).

![using transfonter fonts](https://ucarecdn.com/fda956b8-ec07-4afd-b80c-35790c9bba85/)

I hope you enjoy this brief tutorial.

You can contact me if you have any questions, just open an issue in my project [Blogolio](https://github.com/Devrax/Blogolio). :)
