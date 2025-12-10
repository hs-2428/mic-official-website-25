'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import PresidentCard from './components/PresidentCard';
import VicePresidentCard from './components/VicePresidentCard';
import ManagementSecCard from './components/ManagementSecCard';
import TechSecCard from './components/TechSecCard';
import NonTechSecCard from './components/NonTechSecCard';
import RedCard from './components/RedCard';
import BlueCard from './components/BlueCard';
import GreenCard from './components/GreenCard';
import YellowCard from './components/YellowCard';

interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number; 
}

const leadsData = [
  { name: 'Sanjay Dinesh', title: 'AIML', imageSrc: '/images/mic_departments/aiml_sanjay.jpg' },
  { name: 'Abhinav Kumar V', title: 'AIML', imageSrc: '/images/mic_departments/aiml_abhinav.jpg' },
  { name: 'Aman', title: 'CP', imageSrc: '/images/mic_departments/cp_aman.jpg' },
  { name: 'Anmol Singh', title: 'CP', imageSrc: '/images/mic_departments/cp_anmol.jpg' },
  { name: 'Aagney', title: 'Content', imageSrc: '/images/mic_departments/content_aagney.jpg' },
  { name: 'Shambhavi', title: 'Content', imageSrc: '/images/mic_departments/content_shambhavi.jpg' },
  { name: 'Pranjal Mitra', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_pranjal.jpg' },
  { name: 'Mohammed Tahir', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_mohammed.jpg' },
  { name: 'Gladwin Daniel', title: 'Design', imageSrc: '/images/mic_departments/design_Gladwin.jpg' },
  { name: 'Jahnavi Nair', title: 'Design', imageSrc: '/images/mic_departments/' },
  { name: 'Rakshana V', title: 'Development', imageSrc: '/images/mic_departments/dev_rakshana.jpg' },
  { name: 'Mithil Girish', title: 'Development', imageSrc: '/images/mic_departments/dev_mithil.jpg' },
  { name: 'Samyak Srijan', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_samyak.jpg' },
  { name: 'Abishek B S', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_abhishek.jpg' },
  { name: 'Jefrey Jose D', title: 'Management', imageSrc: '/images/mic_departments/man_jefrey.jpg' },
  { name: 'Namita Sathish', title: 'Management', imageSrc: '/images/mic_departments/man_namitha.jpg' },
  { name: 'Bhargavi Deshmukh', title: 'Management', imageSrc: '/images/mic_departments/man_bhargavi.jpg' },
  { name: 'Anjum Sana', title: 'Social Media', imageSrc: '/images/mic_departments/so_sana.jpg' },
  { name: 'Mithun Miras', title: 'Social Media', imageSrc: '/images/mic_departments/so_mithun.jpg' },
  { name: 'Sravan Kowsik G', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_shravan.jpg' },
  { name: 'Richika Rani', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_richika.jpg' },
];

const cardOrder = [RedCard, BlueCard, GreenCard, YellowCard];

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(Number(baseTop) + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const MeetTheBoardPage: React.FC = () => {
  const [view, setView] = useState<'board' | 'departments'>('board');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());

  // Define cloud positions using hooks at the top level
  const cloudPositions = [
    useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Add transparent scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      /* Transparent scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
      
      /* Fade in animation for expanded departments */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }
    `;
    document.head.appendChild(style);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // Set scroll behavior based on view
    if (view === 'board') {
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    }

    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.head.removeChild(style);
    };
  }, [view]); // Add view as dependency to re-run when view changes

  const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5",
        borderColor: "#3b82f6",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };

  const themeColors = getThemeColors();

  // Group leads by department
  const departmentGroups = leadsData.reduce((acc, lead) => {
    if (!acc[lead.title]) {
      acc[lead.title] = [];
    }
    acc[lead.title].push(lead);
    return acc;
  }, {} as Record<string, typeof leadsData>);

  // Define consistent color mapping for departments
  const departmentColors: Record<string, { CardComponent: any; colorName: string }> = {
    'AIML': { CardComponent: RedCard, colorName: 'Red' },
    'CP': { CardComponent: BlueCard, colorName: 'Blue' },
    'Content': { CardComponent: GreenCard, colorName: 'Green' },
    'Cyber Security': { CardComponent: YellowCard, colorName: 'Yellow' },
    'Design': { CardComponent: RedCard, colorName: 'Red' },
    'Development': { CardComponent: BlueCard, colorName: 'Blue' },
    'Entrepreneurship': { CardComponent: GreenCard, colorName: 'Green' },
    'Management': { CardComponent: YellowCard, colorName: 'Yellow' },
    'Social Media': { CardComponent: RedCard, colorName: 'Red' },
    'UI/UX': { CardComponent: BlueCard, colorName: 'Blue' },
  };

  const toggleDepartment = (department: string) => {
    setExpandedDepartments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(department)) {
        newSet.delete(department);
      } else {
        newSet.add(department);
      }
      return newSet;
    });
  };

  // Prepare rows for departments view
  const rows = [];
  const cardsPerRow = 4;
  for (let i = 0; i < leadsData.length; i += cardsPerRow) {
    rows.push(leadsData.slice(i, i + cardsPerRow));
  }

  return (
    <div className="full-screen-container">
      <div className="content-wrapper">
        <div
          className={`${view === 'board' ? 'h-screen' : 'min-h-screen'} w-full flex flex-col items-center px-4 py-8 relative overflow-x-hidden`}
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
          }}
        >
          {/* Clouds */}
          {(() => {
            const cloudImages = [
              '/images/cloud1.png', '/images/cloud2.png', '/images/cloud1.png',
              '/images/cloud3.png', '/images/cloud3.png', '/images/cloud2.png',
              '/images/cloud1.png', '/images/cloud3.png', '/images/cloud2.png',
              '/images/cloud1.png'
            ];

            return cloudPositions.map((pos, i) => (
              <Image
                key={i}
                src={cloudImages[i]}
                alt={`Cloud ${i + 1}`}
                width={355}
                height={228}
                style={{ position: 'absolute', ...pos, zIndex: 2 }}
              />
            ));
          })()}

          {/* Stars / Dots - only show in departments view */}
          {view === 'departments' && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
              <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
                <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
                <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
                <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
                <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
                <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
                <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
                <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
              </svg>
            </div>
          )}

          {/* Heading */}
          <h1 className={`${themeColors.textColor} font-press-start z-10 text-center mb-6`}
            style={{ fontSize: "clamp(1.5rem, 6vw, 4rem)" }}>
            Meet the Team
          </h1>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10 w-full max-w-[720px] px-4">
            {/* Board Button */}
            <button
              className={`relative w-full sm:w-[345px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('board')}
              aria-pressed={view === 'board'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span className="font-press-start text-[16px] sm:text-[24px] text-black z-10">BOARD</span>
            </button>

            {/* Departments Button */}
            <button
              className={`relative w-full sm:w-[345px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('departments')}
              aria-pressed={view === 'departments'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span className="font-press-start text-[16px] sm:text-[24px] text-black z-10">DEPARTMENTS</span>
            </button>
          </div>

          {/* Board View */}
          {view === 'board' && (
            <div className="flex flex-col items-center space-y-8 relative z-10">
              <div className="flex justify-center space-x-8">
                <PresidentCard name="NAME" />
                <VicePresidentCard name="NAME" />
                <ManagementSecCard name="NAME" />
              </div>
              <div className="flex justify-center space-x-8">
                <TechSecCard name="NAME" />
                <NonTechSecCard name="NAME" />
              </div>
            </div>
          )}

          {/* Departments View */}
          {view === 'departments' && (
            <div className="flex flex-col items-center space-y-6 relative z-10 w-full max-w-[1400px] px-4">
              {Object.entries(departmentGroups).map(([department, leads]) => {
                const isExpanded = expandedDepartments.has(department);
                const { CardComponent, colorName } = departmentColors[department] || { CardComponent: RedCard, colorName: 'Red' };
                
                return (
                  <div key={department} className="w-full">
                    {/* Department Header - Clickable Folder */}
                    <button
                      onClick={() => toggleDepartment(department)}
                      className={`w-full max-w-[800px] mx-auto h-[80px] flex items-center justify-between px-8 border-4 font-press-start text-black transition-all duration-300 hover:scale-105 ${
                        colorName === 'Red' ? 'bg-[#FFDFE8] border-[#E8A2B5]' :
                        colorName === 'Blue' ? 'bg-[#CBF1FD] border-[#B3D9FF]' :
                        colorName === 'Green' ? 'bg-[#C5FFD8] border-[#ABEEAB]' :
                        'bg-[#fff4dd] border-[#FFD782]'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[24px]">{isExpanded ? '📂' : '📁'}</span>
                        <span className="text-[18px] sm:text-[24px]">{department}</span>
                        <span className={`text-[14px] sm:text-[16px] opacity-70`}>
                          ({leads.length} {leads.length === 1 ? 'Lead' : 'Leads'})
                        </span>
                      </div>
                      <span className="text-[24px]">{isExpanded ? '▲' : '▼'}</span>
                    </button>

                    {/* Department Leads - Expandable */}
                    {isExpanded && (
                      <div className="mt-6 flex flex-wrap justify-center gap-8 animate-fadeIn">
                        {leads.map((lead, index) => (
                          <CardComponent
                            key={index}
                            name={lead.name}
                            title={lead.title}
                            imageSrc={lead.imageSrc}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetTheBoardPage;