# Freelance Project: Sandro Gromen-Hayes Portfolio Website

#### STILL UNDER ACTIVE DEVELOPMENT
 
## Overview

### Problem
A portfolio website for the client Sandro Gromen-Hayes, a filmmaker who specialises in high altitudes and hostile environments
 
### Solution
Design and Build a portfolio website that stands out, loads quickly on slow internet, is mobile friendly and is easy to maintain and update 

### Deployment
The website is currently deployed on Vercel and can be found here: https://sandro-site.vercel.app/ 

### Requirements
**Simple but unique design** A simple but unique design ensures that the videos and photos are the main focus of the website, but still highlighting the client's industry. To add wow factor I designed and developed an interactive 3D mountain scene which is tranversed as the user navigates the website. I added a Day and Night sun cycle for variety and I also used Framer Motion library to animate certain elements.

**Photo Gallery** A photo gallery to showcase the client's best work in a visually appealing and organised way

**Video Gallery** A video gallery allows the client to display any video work captured, expanding the range of media showcased and providing a dynamic element to the portfolio

**About Page** An About Page provides important information about the client, helping to establish their personal brand and build a connection with potential clients or collaborators

**Contact Page** A Contact Page to make it easy for potential clients, and collaborators of the client to get in touch with them, opening up opportunities for work, sales, and networking

**Easy to update main content** Making the main content easy to update as the client is non technical and generally a busy person often without access to a laptop 

**Mobile Friendly** A mobile friendly design to ensure the portfolio looks great and functions well on all devices, from desktops to smartphones, providing a good user experience for all visitors including those in remote mountainous areas 

**Performant Website** A performant website which loads quickly and runs smoothly, to provide a good user experience, and again providing a good user experience for all visitors including those in remote mountainous areas with slow internet access
  
### Technologies used
**React** for the ease of declarative syntax, component-based architecture, custom hooks and performant DOM management

**Next.JS** for static html, easy integrated API calls and no back end for easy hosting

**React Three Fiber Library** brings the declarative and component-based nature of React to Three.js, making it easier to create and manage complex 3D scenes

**Zustand** simplified state management by providing a more intuitive API  and minimalistic approach than other state management libraries

**TailwindCSS** provides low-level utility classes that let you build completely custom designs directly in the React components / JSX, which increases the speed of development and makes it easier to maintain consistency

**YouTube API** relying on YouTube's CDN / server infrastructure to ensure that videos are as performant as possible to a global audience

**Cloudinary API** relying on Cloudinarys CDN / server infrastructure to ensure that images are as performant as possible to a global audience

**Vercel Hosting** relying on Vercel's CDN / server infrastructure to ensure that the website itself is as performant as possible to a global audience.

 
### Wins
**useNavigation** is a custom React Hook which reacts to user interactions such as scrolling or swiping. The hook takes two arguments: a reference to a DOM element to listen for events and the next route to be navigated to. This simplified and removed a lot of repeated code as initially I had the logic in each of the pages/components where routing was possible.

**usePlayAnimations** is a custom React Hook which manages the state and effects for playing animations. It uses several built-in React hooks as well as a custom context hook (useAnimationsContext). This hook is useful because it provides a clean and reusable way to handle complex animations logic, including starting and stopping animations, tracking the animation state, and managing the animation mixer and actions. The hook starts a specific animation, updates the local and global states to indicate that an animation is playing, and sets up an event listener to run a function when the animation finishes. This encapsulates a lot of complex logic into a single reusable hook, making it easier to manage animations in the application.

**YouTube integration** was another win as the client uses YouTube already to upload their video content, it meant that they don't have to duplicate effort to reupload content to their website as it pulls in and displays all of their latest videos and playlists. 

**Performance and Optimisations** 
- Utilising YouTube and Cloudinary CDN platforms was highly beneficial as it allows the application to leverage a global infrastructure. This significantly improved the performance and reliability of the application by reducing the latency of content delivery, especially for users who are geographically distant from the origin server.

- Using Vercel hosting for their a global edge network, caching layer and static asset hosting for the images, videos and models reduced the load times of the website. As it connects to Github it also meant that whenever I push changes to the repo, the latest changes are then deployed to the website automatically.

- Model optimization was a crucial step in improving the performance of the site. I did several optimisations including:
    - The initial model I created was extremely large, so I did a lot of Mesh simplification and vertex optimization in Blender 
    - I used pmndrs GLTFJSX to transforms the GLTF asset into a reusable React-Three-Fiber JSX components, allowing for more efficient usage and manipulation of 3D models in the application
    - I used the Draco compression library to compressing the 3D mesh, which can significantly reduced the size of 3D models and improved the loading speed 
    - I used image compression and optimisation tools to reduce the size for the textures and used a texture map of a repeating texture to ensure the size was as small as possible.

- I used small-sized, web-friendly WOFF fonts to ensure that the text in the application is rendered properly and quickly across different browsers and devices.

- The overall website size is 5.4MB which is a fair size for modern websites/apps to ensure quick load times and a smooth user experience.


### Blockers
**Clip path** - As out of the box tailwind CSS does not support clip path which I needed to style some of the elements in certain ways such as the Gallery's MOTION and STILLS menu. Although there are libraries that add this functionality to tailwind I wanted to minimise the use of dependencies and so I used vanilla CSS and classes to achieve this.

**Camera Switching** - As it is not easily possible to control the camera rotation with animations and also have user input for these at the same time, the solution I found was to use two different cameras. One camera is the animation camera which follows the rotation and position animation arrays. The other dynamic camera has a slight camera shake effect and moves around its axis based on either mouse or gyroscope input. To ensure the correct camera is used at the correct time I incorporated mounting logic to only mount the relevant camera when animations have finished playing. When the dynamic camera is mounted, it feeds the last vector position and rotation of the animation camera into the dynamic camera component to ensure it is located in the right place.

**Animation Jank** - Initially it was possible for the user to trigger multiple animations at the same time or in quick succession, this resulted in unwanted behaviours and incorrect animations. Using the zustand store to store the boolean state of whether animations are currently playing. This is then used to prevent multiple animations playing at once or in quick succession, prevents route changes when animations are playing and also dictates which camera is mounted when.

**Next 13 migration and app layout** - different app router system, this is a less developed system and doesn't yet have features such as router.events that Next 12 had and so required a different approach to routing logic that I have used before.


### Future Development
**Finish off styling** including responsive design, further element animations and placeholders whilst the images load in the gallery

**More interactions** such as 3D text using pmndrs' Tunnel Rat tooling and wireframe mountains on click

**Loader** to be displayed when the site is loading, these will be footsteps in snow created by a SVG following a path on a white background

**Day Night cycle pause** on certain pages and in wireframe mode for ease of visibility of some elements and model

**Movement interaction** Smooth out mouse movement interaction and use gyroscope for mobile devices

**Post processing** to add more polish and mood to the 3D scene, I want to add depth of field and some bokeh or lens flare lighting effects when the sun rises as if the camera has a lens for added realism. The depth of field will also hide some artifacts from the small model

**All Videos on YouTube Gallery** I need to add a #ALL on the YouTube gallery, this is loaded by the first API call but currently not easily accessed once the user presses into the different playlists 

**Bugs**

### Bugs
- Currently not all of the site is mobile friendly
- Currently the Gallery's styling needs to be finished
- Currently the menu doesn't open
- Currently the back button doesn't go back on some routes


### Lessons Learnt
**Trigger system** Initially I had a complex custom trigger system in my zustand store to manage the timeline of events and animations, this was bad developer experience as whenever I added new functionality I had to update all of the triggers to the new sequence. I removed all of this and rewrote the logic so now event are triggered on components mounting and dismounting.

**Custom hooks** are a powerful tool within React that encapsulates complex logic into functions, enhancing code reusability and readability. I implemented the useNavigation and usePlayAnimations hooks which simplifies navigation-related code by responding to user interactions like scrolling or swiping., and manages the state and effects for playing animations using various built-in React hooks and a custom context hook. Through custom Hooks, I was able to write components in a more functional manner, enhancing their readability and ease of testing. They also allowed me to reuse stateful logic across multiple components without altering the component hierarchy, reducing code duplication and simplifying their understanding and management

**Vector maths**  was used extensively for managing states, animations, and object transformations in the Day / Night sun cycle.  The initial position of the sun is set using the THREE.Vector3 method, which creates a new vector instance. The clone, sub, applyAxisAngle, add, and toArray methods are used to perform vector operations that calculate the new position of the sun at every frame. The axis of rotation for the sun's orbit is calculated using the THREE.Vector3 method. This vector represents the amount of rotation around each axis (x, y, z). The applyAxisAngle method is used to apply this rotation to the sun's position vector. The useFrame hook is used to continuously update the position of the sun, creating an animation effect.
