import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon, EmailIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { useTheme } from '@/app/assets/ThemeContext';

const ShareButton = ({ title }) => {
  const shareUrl = window.location.href;
  const { theme } = useTheme();  // Access the current theme
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false); // Reset the icon after 2 seconds
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex space-x-3">
      {/* Facebook Share Button */}
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* Twitter Share Button */}
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* LinkedIn Share Button */}
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* WhatsApp Share Button */}
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} className="rounded-full" />
      </WhatsappShareButton>

      {/* Email Share Button using react-share */}
      <EmailShareButton url={shareUrl} subject={title} body={`Check this out: ${shareUrl}`}>
        <EmailIcon size={32} className="rounded-full" />
      </EmailShareButton>

      {/* Copy URL Button */}
      <CopyToClipboard text={shareUrl} onCopy={handleCopy} className="cursor-pointer bg-white p-2 rounded-full">
          {copied ? <FaCheck size={32} className="text-green-500 rounded-full" /> : <FaRegCopy size={32} className="rounded-full" />}
      </CopyToClipboard>
    </div>
  );
};

export default ShareButton;
