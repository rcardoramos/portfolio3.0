const jobData = [
    {
        company: "MindDev Perú",
        link: "https://www.minddevperu.com/",
        title: { es: "Founder & CEO / Lead Frontend Developer", en: "Founder & CEO / Lead Frontend Developer" },
        range: "2022 — Actualidad",
        location: { es: "Lima, Perú (Híbrido)", en: "Lima, Peru (Hybrid)" },
        description: {
            es: [
                "Líder visionario detrás de MindDev, con enfoque en la innovación ágil y la expansión de la compañía en el ámbito de la transformación digital.",
                "Responsable de la definición de la arquitectura técnica y las mejores prácticas de desarrollo Frontend, priorizando la creación de experiencias de usuario memorables y accesibles.",
                "Fomento de un entorno de desarrollo de alto rendimiento, aplicando metodologías de microservicios y asegurando la escalabilidad de todas las soluciones web.",
                "Participación activa como desarrollador Frontend en proyectos clave, asegurando la entrega de código limpio, mantenible y de alta calidad."
            ],
            en: [
                "Visionary leader behind MindDev, focused on agile innovation and company expansion in the digital transformation sector.",
                "Responsible for defining the technical architecture and Frontend development best practices, prioritizing the creation of memorable and accessible user experiences.",
                "Fostering a high-performance development environment, applying microservice methodologies and ensuring the scalability of all web solutions.",
                "Active participation as a Frontend developer in key projects, ensuring the delivery of clean, maintainable, and high-quality code."
            ]
        },
        stack: "React · Next.js · TypeScript · Liderazgo · Arquitectura de Microservicios · Agile · Git"
    },
    {
        company: "Intercapital Perú",
        link: "https://intercapitalperu.com",
        title: { es: "Frontend Web Developer", en: "Frontend Web Developer" },
        range: "Agosto. 2024 – Actualidad",
        location: { es: "Lima, Perú (Presencial)", en: "Lima, Peru (On-site)" },
        description: {
            es: [
                "Encargado del desarrollo, optimización y mantenimiento del sitio web principal de Intercapital Perú y Dominick Pro, priorizando rendimiento, accesibilidad y experiencia de usuario.",
                "Implementación de optimizaciones de rendimiento (caching y lazy loading), logrando reducir los tiempos de carga en más del 35% y mejorando la estabilidad de la plataforma.",
                "Aplicación de prácticas avanzadas de SEO on-page y accesibilidad (WCAG), lo que resultó en un incremento significativo en la visibilidad orgánica.",
                "Desarrollo de la interfaz bajo un enfoque mobile-first utilizando Tailwind CSS, asegurando una experiencia fluida en múltiples dispositivos.",
                "Integración de formularios de captura de leads seguros y funcionales (FormSubmit/Formcarry), consolidando la presencia digital y mejorando la conversión."
            ],
            en: [
                "Responsible for the development, optimization, and maintenance of Intercapital Perú and Dominick Pro's main website, prioritizing performance, accessibility, and user experience.",
                "Implemented performance optimizations (caching and lazy loading), achieving a reduction in load times by over 35% and improving platform stability.",
                "Applied advanced SEO on-page and accessibility (WCAG) practices, resulting in a significant increase in organic visibility.",
                "Developed the interface using a mobile-first approach with Tailwind CSS, ensuring a smooth experience across multiple devices.",
                "Integrated secure and functional lead capture forms (FormSubmit/Formcarry), consolidating digital presence and improving lead conversion."
            ]
        },
        stack: "HTML5 · CSS3 · JavaScript · Tailwind CSS · PHP · Git · GitHub · CPanel"
    },
    {
        company: "JFG Corporation",
        link: "https://www.jfgcorporation.com/contacts.php",
        title: { es: "Frontend Developer", en: "Frontend Developer" },
        range: "Abril. 2023 – Enero. 2024",
        location: { es: "Lima, Perú (Remoto)", en: "Lima, Peru (Remote)" },
        description: {
            es: [
                "Participación en el desarrollo de un aplicativo web integral para la gestión de servicios técnicos, aplicando prácticas modernas de desarrollo frontend para la eficiencia y experiencia de usuario.",
                "Construcción de una librería de componentes reutilizables en Storybook siguiendo la metodología Atomic Design, potenciando la escalabilidad del frontend.",
                "Diseño e implementación de la arquitectura en React + TypeScript, logrando optimizar el flujo de trabajo del equipo.",
                "Desarrollo de pruebas unitarias con Jest, simplificando el flujo de uso y aumentando la satisfacción del usuario en un 30% (medido por retroalimentación).",
                "Trabajo activo bajo la metodología Scrum, optimizando la colaboración del equipo."
            ],
            en: [
                "Participated in the development of an integrated web application for technical service management, applying modern frontend development practices for efficiency and user experience.",
                "Built a reusable component library in Storybook following the Atomic Design methodology, enhancing frontend scalability.",
                "Designed and implemented the architecture in React + TypeScript, optimizing the team's workflow.",
                "Developed unit tests with Jest as part of quality assurance best practices, simplifying user flow and increasing user satisfaction by 30% (measured by feedback).",
                "Actively worked under the Scrum methodology, optimizing team collaboration."
            ]
        },
        stack: "React · TypeScript · Storybook · Atomic Design · Jest · Redux · Context API · Node.js · MongoDB · Tailwind CSS · GitHub"
    }
];

let activeJob = 0;

const jobTabsContainer = document.getElementById('job-tabs');
const jobDetailsContainer = document.getElementById('job-details');

function renderJobDetails(job) {
    const companyLink = job.link ? job.link : '#';
    const location = job.location ? `<p class="date">${job.location[currentLang] || job.location.es}</p>` : '';

    jobDetailsContainer.innerHTML = `
                <h3 class="text-xl font-bold mb-1">${job.title[currentLang] || job.title.es} <a href="${companyLink}" target="_blank" style="color: var(--lila);" class="job-details-company-link">@ ${job.company}</a></h3>
                <p class="date">${job.range}</p>
                ${location}
                <div class="mt-4 space-y-4">
                    ${(job.description[currentLang] || job.description.es).map(item => `
                        <p class="text-sm" style="color: var(--secondary-text-color);">${item}</p>
                    `).join('')}
                </div>
                
                <div class="mt-6">
                    <p class="font-bold text-sm mb-2" style="color: var(--primary-text-color);">Stack Tecnológico:</p>
                    <p class="text-xs font-mono" style="color: var(--secondary-text-color);">${job.stack}</p>
                </div>
            `;
    lucide.createIcons();
}

function changeTab(index) {

    const buttons = jobTabsContainer.querySelectorAll('.job-tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (buttons[index]) {
        buttons[index].classList.add('active');
    }

    renderJobDetails(jobData[index]);
    activeJob = index;
}


function initJobTabs() {
    if (!jobTabsContainer) return;

    jobData.forEach((job, index) => {
        const button = document.createElement('button');
        button.classList.add('job-tab-button', 'whitespace-nowrap', 'text-sm');
        button.textContent = job.company;
        button.setAttribute('data-index', index);

        button.addEventListener('click', () => {
            changeTab(index);
        });

        jobTabsContainer.appendChild(button);
    });

    if (jobData.length > 0) {
        changeTab(activeJob);
    }
}