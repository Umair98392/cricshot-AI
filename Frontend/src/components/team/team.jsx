import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLinkedin, faGithub,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaXTwitter } from "react-icons/fa6";
import Img1 from '../../assets/pics/sri.jpg';
import Img2 from '../../assets/pics/umair.jpg';
import Img3 from '../../assets/pics/gyan.jpg';

function TeamMember({ name, role, description, imageSrc, twitterLink, facebookLink, linkedInLink, githubLink }) {
  

  return (
    <div
      className="bg-gray-50 rounded-lg shadow dark:bg-[#0e161a] flex flex-col items-center text-center py-6 px-4 mx-2"
      
      style={{ maxWidth: '300px' }}
    >
      <img
        className="w-32 h-32 rounded-md mb-4"
        src={imageSrc}
        alt={`${name} Avatar`}
      />
      <div>
        <h3 className="text-lg font-semibold dark:text-white mb-1"><a href="#">{name}</a></h3>
        <span className="text-gray-500 mb-2 block">{role}</span>
        <p className="text-gray-600">{description}</p>
      </div>
      <ul className="flex justify-center mt-4 space-x-4">
        <li>
          <a href={twitterLink} className="text-gray-500 hover:text-green-700">
          <FaXTwitter className='mt-1'/>
          </a>
        </li>
        <li>
          <a href={facebookLink} className="text-gray-500 hover:text-green-700">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li>
          <a href={linkedInLink} className="text-gray-500 hover:text-green-700">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
        <li>
          <a href={githubLink} className="text-gray-500 hover:text-green-700">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
      </ul>
    </div>
  );
}

function Team() {
  return (
    <section className="bg-gray-100 dark:bg-[#1C2222]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl font-semibold text-center tracking-tight text-gray-800 dark:text-white">Our Team</h2>
          <p className="font-medium text-gray-500 text-center lg:mb-16 sm:text-xl dark:text-gray-400">
            We’re a dynamic group of individuals who are passionate about what we do
          </p>
        </div>
        <div className="grid gap-10 mb-6 lg:mb-16 md:grid-cols-3 sm:grid-cols-1 justify-items-center">
          <TeamMember
            name="Shri Kant"
            role="Designer & Web Developer"
            description="Crafting digital experiences that delight users is my passion. Explore my work and get in touch!"
            imageSrc={Img1}
            twitterLink="https://twitter.com/"
            facebookLink="https://instagram.com/shrikant20.1.7?utm_source=qr&igshid=MThlNWY1MzQwNA=="
            linkedInLink="https://www.linkedin.com/in/shri-kant-a03099200/"
            githubLink="https://github.com/shrIKant-07"
          />
          <TeamMember
            name="Mohd. Umair"
            role="ML Engineer"
            description="A Machine Learning Engineer dedicated to developing intelligent algorithms that transform data into actionable insights."
            imageSrc={Img2}
            twitterLink="https://twitter.com/umair98392"
            facebookLink="https://www.instagram.com/umair98392/"
            linkedInLink="https://www.linkedin.com/in/umair98392/"
            githubLink="https://github.com/umair98392"
          />
           <TeamMember
            name="Gyanendra Shukla"
            role="Backend Engineer"
            description="A backend developer specializing in creating robust and scalable APIs to power seamless digital experiences."
            imageSrc={Img3}
            twitterLink={null}
            facebookLink={null}
            linkedInLink={null}
            githubLink="https://github.com/gyanendra790/"
          />
          {/* Add more TeamMember components here */}
        </div>
      </div>
    </section>
  );
}

export default Team;