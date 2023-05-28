import React from 'react';

import HomeFooterSection from '@/components/Content/Home/FooterSection';
import AboutContent from '@/components/Content/About/AboutContent';
import AboutUsSecondLayer from '@/components/Content/About/AboutUsSecondLayer';
import AboutUsThirdLayer from '@/components/Content/About/AboutUsThirdLayer';

const aboutUs = () => {

  return (
    <>
    <AboutContent/>
      <AboutUsSecondLayer/>
      <AboutUsThirdLayer/>
      <HomeFooterSection />
    </>
  );
};

export default aboutUs;