import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { themes } from '@local/core';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { page_path: window.location.pathname });
                                `,
                        }}
                    />
                    {/* <!-- Google Meets SDK --> */}
                    <script async type='text/javascript' src='https://www.gstatic.com/meetjs/embed/0.1.0/meet.js' />
                    <link href='https://www.gstatic.com/meetjs/embed/0.1.0/meet.css' rel='stylesheet' />
                    {/* PWA primary color */}
                    <meta name='theme-color' content={themes.dark.palette.primary.main} />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => <App {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles)],
    };
};
