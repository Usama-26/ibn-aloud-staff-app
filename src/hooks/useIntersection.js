import React, { useState, useEffect } from "react";

export default function useIntersection(sectionId = null) {
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Section with ID "${sectionId}" not found.`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, root: null }
    );

    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [sectionId]);

  return isSectionVisible;
}
