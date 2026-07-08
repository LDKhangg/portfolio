import React from "react";
import SocialButton from "./SocialButton";

import FacebookIcon from "../assets/facebook-svgrepo-com.svg?react";
import GithubIcon from "../assets/github-142-svgrepo-com.svg?react";
import GmailIcon from "../assets/gmail-old-svgrepo-com.svg?react";
import LinkedinIcon from "../assets/linkedin-svgrepo-com.svg?react";

const SocialButtonGroup: React.FC = () => {
  return (
    <div className="flex grid-cols-2 gap-20">
      <SocialButton
        icon={<GithubIcon />}
        href="https://github.com/DKhangggg"
        colorClass="white"
        rotation="-rotate-3"
      />
      <SocialButton
        icon={<LinkedinIcon />}
        href="https://www.linkedin.com/in/l%C3%AA-duy-khang-057765265/"
        colorClass="blue-500"
        rotation="rotate-2"
      />
      <SocialButton
        icon={<GmailIcon />}
        href="mailto:lekhangmc12@gmail.com"
        colorClass="red-500"
        rotation="-rotate-2"
      />
      <SocialButton
        icon={<FacebookIcon />}
        href="https://www.facebook.com/le.khang.207081/"
        colorClass="blue-700"
        rotation="rotate-3"
      />
    </div>
  );
};

export default SocialButtonGroup;
