# randomQgen
![image](https://user-images.githubusercontent.com/37664921/110021438-ebb27c80-7d54-11eb-82e5-ce08c8628f2b.png)

[randomQgen](https://randomqgen.vercel.app/) is an online tool to generate random PDFs from question sets that you provide in order to mitigate the issue of students adopting unfair means in exams using Chegg, CourseHero or other online platforms. Read about the motivation [here](https://randomqgen.vercel.app/info).

### Current features:
- Generate random PDFs from question sets (questions can be single page or multi-page)
- Able to assign unique footer at the end of each page in the generated PDFs (right now, the format is fixed)

### Future work:
- Add authentication
- Save the zip files for a certain period of time if the user is authenticated when generating them
- Offer more footer formats
- Visualizing the output

---------------------------------------------------------------------------------------------------------


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started for development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
