# Pay Crypto react app

This is an educational version of a cryptocurrency payment application, which, according to the original idea, allows users to create accounts for receiving and sending payments using cryptocurrency. These accounts combine other cryptocurrency wallets, which helps to manage all transactions in one place.

**[View deployment](https://paycrypto-zeta.vercel.app/)**

If you don't want to register with your own email you can use this data to login into test account (dont change password, please, in case someone else want to use it as well):

Email: *dimanesterov11@gmail.com <br>*
Password: *qwerty*

### This version includes:

* **JWT authentication implementation**: Authentication uses a pair of tokens - access and refresh. 
* **API integration**: Allows user to create or delete payment accounts, modify user's account (change email, nickname, password and avatar).
* **Routing**: Used [React Router](https://reactrouter.com/) library to handle app routing.
* **Implementation of the theme switching**: Allows user to easily switch between dark and light themes. Also changes default theme state based on user's preferred theme (even if its the first site visit).
* **State managing**: Used [Zustand](https://zustand-demo.pmnd.rs/) to store data needed in different components and has to be saved between sessions. 
* **Advanced animations**: Used [GSAP](https://gsap.com/) library to animate appearance of elements, loaders, alerts etc. Also used [reactbits.dev](https://react.dev/) to make more interesting blog and 404 page and error state after API request.
* **Custom hooks**: Made custom hooks for animations and alert/error messages.
* **Responsive design**: Used [Sass](https://sass-lang.com/) and [Tailwind](https://tailwindcss.com/) to make modern responsive layout.
* **NodeJS + Express Server**: Using Express framework to run a server and mongoose library to connect with MongoDB.

### Build and Deployment

Project was build using [Vite](https://vite.dev/) and deployed using [Vercel](https://vercel.com/). Here are some screenshots of pages available after logging into account:

<p align="center">
  <img src="https://6ck7bvzxze.ucarecd.net/cd05eda1-1fd3-4b0a-9d65-129d24d01421/-/preview/1000x474/" width="49%" />
  <img src="https://6ck7bvzxze.ucarecd.net/12c37c16-cd30-4870-87c9-ec63aace4ec0/-/preview/1000x474/" width="49%" />
</p>

### Technologies used in the project:

* [Vite](https://vite.dev/) - to build project.
* [React Router](https://reactrouter.com/) - to handle app routing.
* [Axios](https://axios-http.com/) - to handle API requests and server responses.
* [Zustand](https://zustand-demo.pmnd.rs/) - was chosen over, for example, Redux, because only a small amount of information needed to be stored in the state manager, so it was faster and easier to use Zustand.
* [Sass](https://sass-lang.com/) - to style complex components in a modern way.
* [Tailwind](https://tailwindcss.com/) - to style components faster and easier when there is no need to make complex layouts.
* [GSAP](https://gsap.com/) - to animate UI.
* [Dotenv](https://www.npmjs.com/package/dotenv) - to safely store environment variables. 
* [Express](https://expressjs.com/) - to easily run a server.
* [Mongoose](https://mongoosejs.com/) - to handle MongoDB connection.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - to hash passwords.
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - to create, save and verify tokens.
* [Nodemailer](https://nodemailer.com/) - to send verification email.
* [Uploadcare](https://uploadcare.com/) - to store images.