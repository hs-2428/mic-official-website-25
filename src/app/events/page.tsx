"use client";

import React, { useState, useEffect } from "react";

// CSS animations for Pac-Man and ghosts
const pacmanAnimation = `
@keyframes pacmanMove {
  0% {
    left: -5%;
  }
  100% {
    left: 105%;
  }
}

@keyframes ghostFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes ghostWobble {
  0%, 100% {
    transform: translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateX(-5px) rotate(-5deg);
  }
  75% {
    transform: translateX(5px) rotate(5deg);
  }
}

@keyframes ghostEaten {
  0%, 24%, 49%, 74%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  25%, 50%, 75% {
    opacity: 0;
    transform: scale(0.2);
  }
  26%, 51%, 76% {
    opacity: 1;
    transform: scale(1);
  }
}

.pellet-eaten {
  animation: pelletEat 0.2s linear forwards;
}

@keyframes pelletEat {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(0);
    display: none;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = pacmanAnimation;
  document.head.appendChild(styleSheet);
}

const events = [
  {
    title: "Cyber Security Treasure Hunt",
    desc: "The event emphasized critical thinking, time management, and cybersecurity fundamentals",
    details: "The Microsoft Innovation Club hosted an exciting “Cyber Security Treasure Hunt,” where participants engaged in clue-based challenges, quizzes, and problem-solving tasks. The event emphasized critical thinking, time management, and cybersecurity fundamentals. Teams followed a trail of hints to reach final answers, making for a fun and educational experience that concluded with the announcement of the winning teams.",
    bg: "bg-[#FFDFE8]",
    border: "border-[#E8A2B5]",
    text: "text-[#6d1c22]",
    borderColor: "#E8A2B5",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-15"),
  },
  {
    title: "Sherlock IT!",
    desc: "Campus-wide puzzle hunt filled with engaging minigames and mystery-based challenges. ",
    details: "“Sherlock IT!”, held during Pre-Vibrance by the Microsoft Innovations Club, was a campus-wide puzzle hunt filled with engaging minigames and mystery-based challenges. Participants solved interconnected clues that unraveled an overarching storyline. The event blended problem-solving with fun, encouraging teamwork and critical thinking while creating a memorable, interactive experience across the VIT Chennai campus.",
    bg: "bg-[#C5FFD8]",
    border: "border-[#ABEEAB]",
    text: "text-[#095709]",
    borderColor: "#ABEEAB",
    startDate: new Date("2024-10-20"),
    endDate: new Date("2024-10-20"),
  },
  {
    title: "VITopoly RUSH",
    desc: "VITopoly Rush combined strategy, skill, and fun in a Monopoly-inspired competition.",
    details: "Held on Day 1 of Vibrance 2025, VITopoly Rush combined strategy, skill, and fun in a Monopoly-inspired competition. Participants played campus-wide mini-games to earn in-game currency, which they later used in strategic Monopoly rounds. Points earned in these final rounds determined the winners. The event challenged resource management, decision-making, and competitive spirit in an exciting, two-phase format.",
    bg: "bg-[#CBF1FD]",
    border: "border-[#B3D9FF]",
    text: "text-[#0A3A6b]",
    borderColor: "#B3D9FF",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-01"),
  },
  {
    title: "How Hackers Really Hack 4.0",
    desc: "This two-day event featured ethical hacking expert Sriram Kesavan, who shared real-world cybersecurity practices.",
    details: "This two-day event featured ethical hacking expert Sriram Kesavan, who shared real-world cybersecurity practices. Day one included hands-on sessions on vulnerabilities and cyber defense, while day two hosted a thrilling 6-hour CTF contest. Participants applied their learning in competitive challenges, making it a comprehensive experience in practical cybersecurity.",
    bg: "bg-[#CBF1FD]",
    border: "border-[#B3D9FF]",
    text: "text-[#0A3A6b]",
    borderColor: "#B3D9FF",
    startDate: new Date("2025-02-15"),
    endDate: new Date("2025-02-16"),
  },
  {
    title: "Season of AI: India",
    desc: "This session explored India’s booming AI landscape and Microsoft's influence in it.",
    details: "Led by Gold MLSA Deepthi Balasubramanian, this session explored India’s booming AI landscape and Microsoft's influence in it. Attendees learned about responsible AI, Generative AI applications, and tools like Microsoft Copilot and Azure AI Studio. Live demos gave hands-on exposure to Models-as-a-Service and AI integration, empowering students to explore and build innovative, responsible AI solutions.",
    bg: "bg-[#fff4dd]",
    border: "border-[#FFD782]",
    text: "text-[#865B00]",
    borderColor: "#FFD782",
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-01-10"),
  },
  {
    title: "MLSA Explained",
    desc: "This workshop provided a complete overview of the Microsoft Learn Student Ambassadors (MLSA) program.",
    details: "This workshop provided a complete overview of the Microsoft Learn Student Ambassadors (MLSA) program. Speakers Sam Prince and Syed Omar shared insights into the program’s mission, benefits like Azure credits and LinkedIn Premium, and the application process. Attendees left motivated and informed about how to grow as student tech leaders through MLSA.",
    bg: "bg-[#ffdfe8]",
    border: "border-[#E8A2B5]",
    text: "text-[#6d1c22]",
    borderColor: "#E8A2B5",
    startDate: new Date("2024-12-05"),
    endDate: new Date("2024-12-05"),
  },
];

// Sorting function - displays upcoming events first, then past events from most recent to oldest
const sortEventsByDate = (eventsArray: any[]) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to midnight for date-only comparison

  const upcomingEvents = eventsArray.filter((event: any) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now;
  });
  
  const pastEvents = eventsArray.filter((event: any) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });

  // Sort upcoming events by startDate (earliest first)
  upcomingEvents.sort(
    (a: any, b: any) => a.startDate.getTime() - b.startDate.getTime()
  );

  // Sort past events by startDate (most recent first)
  pastEvents.sort((a: any, b: any) => b.startDate.getTime() - a.startDate.getTime());

  return [...upcomingEvents, ...pastEvents];
};

// Helper function to determine if an event is upcoming
const isUpcoming = (event: any) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.startDate);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= now;
};

// Helper function to format date
const formatEventDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

type LineProps = {
  left: string;
  top: string;
  width: string;
  height: string;
  color?: string;
};

const Line: React.FC<LineProps> = ({
  left,
  top,
  width,
  height,
  color = "blue",
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left,
      top,
      width,
      height,
      backgroundColor: color,
      borderRadius: 2,
      zIndex: 50,
    }}
  />
);

const LandingPage = () => {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [eatenPellets, setEatenPellets] = useState<Set<number>>(new Set());
  const [pacmanPosition, setPacmanPosition] = useState(0);
  const [eatenGhosts, setEatenGhosts] = useState<Set<number>>(new Set());

  // Sort events by date
  const sortedEvents = sortEventsByDate(events);

  // Animate Pac-Man position and eat pellets
  useEffect(() => {
    const animationDuration = 12000; // 12 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;
      const position = progress * 110 - 5; // -5% to 105%
      
      setPacmanPosition(position);
      
      // Calculate which pellets should be eaten
      // Pac-Man's mouth is at the front (right side) of the sprite
      // Account for Pac-Man's width and position its mouth correctly
      const totalPellets = 144; // 96 + 48 pellets total
      const pelletRowWidth = 110; // Total width from -5% to 105%
      
      // Pac-Man's mouth position (right edge of sprite)
      const pacmanMouthPosition = position + 3.0;
      
      // Calculate how many pellets are behind Pac-Man's mouth
      const progressThroughPellets = (pacmanMouthPosition + 5) / pelletRowWidth;
      const eatenCount = Math.floor(Math.max(0, progressThroughPellets * totalPellets));
      
      const newEaten = new Set<number>();
      for (let i = 0; i < Math.min(eatenCount, totalPellets); i++) {
        newEaten.add(i);
      }
      
      // Determine which ghosts are eaten based on Pac-Man mouth position
      const ghostPositions = [15, 30, 50, 70, 85]; // Approximate positions where ghosts are
      const newEatenGhosts = new Set<number>();
      ghostPositions.forEach((ghostPos, idx) => {
        // Ghost gets eaten when Pac-Man's mouth reaches it and stays eaten for a while
        if (pacmanMouthPosition >= ghostPos - 1 && pacmanMouthPosition <= ghostPos + 8) {
          newEatenGhosts.add(idx);
        }
      });
      
      // Reset when animation loops (at the very start)
      if (progress < 0.005) {
        setEatenPellets(new Set());
        setEatenGhosts(new Set());
      } else {
        setEatenPellets(newEaten);
        setEatenGhosts(newEatenGhosts);
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);


  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    // Disable scroll and zoom
    const preventScroll = (e: Event) => e.preventDefault();
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);
    document.addEventListener('touchmove', preventScroll, { passive: false });

    if (openCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden"; // Always hidden
    }

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = "";
    };
  }, [openCard]);

  // Theme-specific colors
  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af", // blue-800
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      };
    } else {
      return {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5", // lighter blue for light theme
        borderColor: "#3b82f6", // blue-500
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
    }
  };

  const themeColors = getThemeColors();

  const renderOverlay = () => {
    if (openCard === null) return null;
    const event = sortedEvents[openCard];
    return (
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
        style={{ backdropFilter: "blur(3px)" }}
        onClick={() => setOpenCard(null)}
      >
        <div
          className={`pixel-corners ${event.bg} ${event.text} relative shadow-2xl`}
          style={{
            width: "min(90vw, 600px)",
            minHeight: "min(60vh, 400px)",
            border: `16px solid ${event.borderColor}`,
            padding: "2.5rem 2rem",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            fontWeight: "bold",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-red-500 transition-colors font-bold z-10"
            aria-label="Close"
            onClick={() => setOpenCard(null)}
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            x
          </button>
          <span className="font-press-start text-3xl mb-4">{event.title}</span>
          <p
            className="font-IBM Plex Mono text-base mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {event.desc}
          </p>
          <div className="font-normal text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {event.details}
          </div>
        </div>
      </div>
    );
  };

  const getCardClass = (event: typeof events[0]) =>
    `pixel-corners font-press-start ${event.bg} ${event.text} cursor-pointer transition-all duration-200${openCard === null ? " hover:scale-105 hover:shadow-xl" : ""
    }`;

  return (
    <div
      className={`relative w-screen h-screen bg-cover bg-center overflow-hidden flex flex-col items-center ${themeColors.textColor}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        backgroundRepeat: "repeat, repeat, no-repeat",
        backgroundPosition: "top left, top left, center",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* Dynamic Lines - Responsive to screen size */}
      <Line left="3.6vw" top="14vh" width="5.8vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="5vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="14vh" width="0.3vw" height="70vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="84vh" width="5.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="84vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="93.5vh" width="80.7vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="89.5vw" top="84vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="89.8vw" top="84vh" width="6.2vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="95.8vw" top="14vh" width="0.3vw" height="70.5vh" color={themeColors.lineColor} />
      <Line left="90.6vw" top="14vh" width="5.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="90.6vw" top="5vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="9.2vw" top="5vh" width="81.3vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="45.5vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="7.5vw" top="45.5vh" width="0.3vw" height="8.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="53.5vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="32vh" width="3.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="32vh" width="0.3vw" height="8vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="43vh" width="0.3vw" height="4vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="47vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="78.6vw" top="5vh" width="0.3vw" height="6vh" color={themeColors.lineColor} />
      <Line left="69.5vw" top="10.5vh" width="9.2vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="3.9vw" top="76vh" width="4.3vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="7.9vw" top="69vh" width="0.3vw" height="7vh" color={themeColors.lineColor} />
      <Line left="7.9vw" top="69vh" width="4.3vw" height="0.5vh" color={themeColors.lineColor} />

      {/* Ghost decorations */}
      <img
        src="/greenghost.png"
        alt="Left Decor"
        className="absolute z-30"
        style={{
          width: "min(1.8vw, 28px)",
          height: "min(1.8vw, 28px)",
          top: "70vh",
          right: "13.4vw",
          animation: "ghostFloat 3s ease-in-out infinite",
          opacity: eatenGhosts.has(0) ? 0 : 1,
          transform: eatenGhosts.has(0) ? "scale(0.2)" : "scale(1)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      />
      <img
        src="/redghost.png.png"
        alt="Left Decor"
        className="absolute z-30"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "21.5vh",
          left: "13.1vw",
          animation: "ghostFloat 2.5s ease-in-out infinite 0.5s",
          opacity: eatenGhosts.has(1) ? 0 : 1,
          transform: eatenGhosts.has(1) ? "scale(0.2)" : "scale(1)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      />
      <img
        src="/ghost.png"
        alt="Left Decor"
        className="absolute z-30"
        style={{
          width: "min(2.5vw, 40px)",
          height: "min(2.1vw, 33px)",
          top: "43vh",
          left: "10.5vw",
          animation: "ghostFloat 3.5s ease-in-out infinite 1s",
          opacity: eatenGhosts.has(2) ? 0 : 1,
          transform: eatenGhosts.has(2) ? "scale(0.2)" : "scale(1)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      />
      <img
        src="/yellowghost.png"
        alt="Left Decor"
        className="absolute z-30"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "68vh",
          left: "13.8vw",
          animation: "ghostFloat 2.8s ease-in-out infinite 0.3s",
          opacity: eatenGhosts.has(3) ? 0 : 1,
          transform: eatenGhosts.has(3) ? "scale(0.2)" : "scale(1)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      />
      <img
        src="/blueghost.png"
        alt="Right Decor"
        className="absolute z-30"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "24vh",
          right: "12.4vw",
          animation: "ghostFloat 3.2s ease-in-out infinite 0.7s",
          opacity: eatenGhosts.has(4) ? 0 : 1,
          transform: eatenGhosts.has(4) ? "scale(0.2)" : "scale(1)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        }}
      />
      <img
        src="/yellowghost.png"
        alt="Right Decor"
        className="absolute z-30"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "51vh",
          right: "8.8vw",
          animation: "ghostFloat 2.6s ease-in-out infinite 1.2s",
        }}
      />

      {/* Main Heading */}
      <h1 className={`${themeColors.textColor} font-press-start z-10 text-center mt-14`}
        style={{ fontSize: "min(5vw, 3rem)" }}>
        EVENTS
      </h1>

      <div className="flex flex-col items-center justify-center h-full w-full max-w-none px-4">
        {/* First row of 3 event boxes */}
        <div className="flex flex-row justify-center mb-2"
          style={{ gap: "min(2vw, 32px)" }}>
          {sortedEvents.slice(0, 3).map((event, i) => (
            <div
              key={i}
              className={`${getCardClass(event)} flex flex-col items-center text-center`}
              style={{
                width: "min(19.7vw, 300px)",
                height: "min(19.7vw, 300px)",
                borderRadius: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                fontWeight: "bold",
                padding: "15px",
                position: "relative",
                boxSizing: "border-box",
                border: `14px solid ${event.borderColor}`,
              }}
              onClick={() => setOpenCard(sortedEvents.indexOf(event))}
            >
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  backgroundColor: isUpcoming(event) ? "#4ade80" : "#f87171",
                  color: "white",
                  padding: "3px 6px",
                  borderRadius: "3px",
                  fontSize: "min(0.8vw, 10px)",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {isUpcoming(event) ? "UPCOMING" : "PAST"}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "3px 6px",
                  borderRadius: "3px",
                  fontSize: "min(0.7vw, 9px)",
                  fontWeight: "normal",
                  zIndex: 10,
                }}
              >
                {formatEventDate(event.startDate)}
              </div>
              <span style={{ fontSize: "min(1.6vw, 24px)", marginTop: "35px" }}>{event.title}</span>
              <p
                className="info-text font-normal mt-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "min(0.8vw, 12px)"
                }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pac-Man and Pellets */}
        <div className="relative flex items-center w-full h-12 mx-auto "
          style={{ maxWidth: "min(63.2vw, 964px)" }}>
          <img
            src="/PacMan.gif"
            alt="Pac-Man"
            style={{
              width: "min(3.2vw, 48px)",
              height: "min(3.2vw, 48px)",
              position: "absolute",
              left: `${pacmanPosition}%`,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              transition: "none",
            }}
          />
          <div className="pellets-row">
            <div className="pellets-inner">
              {[...Array(96)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "min(1.05vw, 16px)",
                    height: "min(1.05vw, 16px)",
                    opacity: eatenPellets.has(i) ? 0 : 1,
                    transform: eatenPellets.has(i) ? "scale(0)" : "scale(1)",
                    transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
                  }}
                  className="bg-yellow-300 rounded-full shadow"
                ></div>
              ))}
              {[...Array(48)].map((_, i) => (
                <div
                  key={i + 96}
                  style={{
                    width: "min(1.05vw, 16px)",
                    height: "min(1.05vw, 16px)",
                    opacity: eatenPellets.has(i + 96) ? 0 : 1,
                    transform: eatenPellets.has(i + 96) ? "scale(0)" : "scale(1)",
                    transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
                  }}
                  className="bg-yellow-300 rounded-full shadow"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row of 3 event boxes */}
        <div className="flex flex-row justify-center mt-2 mb-16"
          style={{ gap: "min(2vw, 32px)" }}>
          {sortedEvents.slice(3, 6).map((event, i) => (
            <div
              key={i + 3}
              className={`${getCardClass(event)} flex flex-col items-center text-center`}
              style={{
                width: "min(19.7vw, 300px)",
                height: "min(19.7vw, 300px)",
                borderRadius: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                fontWeight: "bold",
                padding: "15px",
                position: "relative",
                boxSizing: "border-box",
                border: `12px solid ${event.borderColor}`,
              }}
              onClick={() => setOpenCard(sortedEvents.indexOf(event))}
            >
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  backgroundColor: isUpcoming(event) ? "#4ade80" : "#f87171",
                  color: "white",
                  padding: "3px 6px",
                  borderRadius: "3px",
                  fontSize: "min(0.8vw, 10px)",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {isUpcoming(event) ? "UPCOMING" : "PAST"}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "3px 6px",
                  borderRadius: "3px",
                  fontSize: "min(0.7vw, 9px)",
                  fontWeight: "normal",
                  zIndex: 10,
                }}
              >
                {formatEventDate(event.startDate)}
              </div>
              <span style={{ fontSize: "min(1.6vw, 24px)", marginTop: "35px" }}>{event.title}</span>
              <p
                className="info-text font-normal mt-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "min(0.8vw, 12px)"
                }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vertical Dots Right */}
        <div className="absolute flex flex-col z-50"
          style={{
            top: "34vh",
            right: "5.2vw",
            gap: "min(1vh, 14px)"
          }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-dot-${i}`}
              style={{
                width: "min(0.8vw, 12px)",
                height: "min(0.8vw, 12px)"
              }}
              className="bg-yellow-300 rounded-full"
            ></div>
          ))}
        </div>

        {/* Vertical Dots Left */}
        <div className="absolute flex flex-col z-50"
          style={{
            top: "48vh",
            left: "5.2vw",
            gap: "min(1vh, 14px)"
          }}>
          {[...Array(2)].map((_, i) => (
            <div
              key={`left-dot-${i}`}
              style={{
                width: "min(0.8vw, 12px)",
                height: "min(0.8vw, 12px)"
              }}
              className="bg-yellow-300 rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Corner Ghosts */}
      <img
        src="/yellowghost.png"
        alt="Top Left Ghost"
        className="absolute top-20 left-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
          animation: "ghostWobble 4s ease-in-out infinite",
        }}
      />
      <img
        src="/redghost.png.png"
        alt="Top Right Ghost"
        className="absolute top-20 right-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
          animation: "ghostWobble 3.5s ease-in-out infinite 0.5s",
        }}
      />
      <img
        src="/blueghost.png"
        alt="Bottom Left Ghost"
        className="absolute bottom-24 left-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
          animation: "ghostWobble 4.2s ease-in-out infinite 1s",
        }}
      />
      <img
        src="/pinkghost (1).png"
        alt="Bottom Right Ghost"
        className="absolute bottom-20 right-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
          animation: "ghostWobble 3.8s ease-in-out infinite 1.5s",
        }}
      />

      {/* Responsive Borders */}
      <div className="absolute top-6 left-6 right-6 z-40"
        style={{
          height: "min(0.5vh, 8px)",
          backgroundColor: themeColors.borderColor
        }}></div>
      <div className="absolute bottom-6 left-6 right-6 z-40"
        style={{
          height: "min(0.5vh, 8px)",
          backgroundColor: themeColors.borderColor
        }}></div>
      <div className="absolute top-6 bottom-6 left-6 z-40"
        style={{
          width: "min(0.5vw, 8px)",
          backgroundColor: themeColors.borderColor
        }}></div>
      <div className="absolute top-6 bottom-6 right-6 z-40"
        style={{
          width: "min(0.5vw, 8px)",
          backgroundColor: themeColors.borderColor
        }}></div>

      {/* Modal Overlay */}
      {renderOverlay()}


    </div>
  );
};

export default LandingPage;