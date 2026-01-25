# 🚀 DevOps Engineer Portfolio

A modern, interactive portfolio website designed to showcase DevOps skills and projects through the lens of a CI/CD pipeline. Built with **Next.js**, **Tailwind CSS**, and **Framer Motion**, this application offers a unique user experience where visitors navigate through different stages of the software development lifecycle (SDLC) to learn about the engineer.

![Portfolio Preview](/public/devops.png)

## ✨ Features

- **Interactive DevOps Pipeline**: Navigate through stages like Plan, Code, Build, Test, Release, Deploy, Operate, and Monitor.
- **Dynamic Animations**: Smooth transitions and engaging UI effects powered by Framer Motion.
- **Real-Time Monitoring Dashboard**: A simulated system monitor with live metric visualizations.
- **Contact Form Integration**: Fully functional contact form integrated with EmailJS.
- **Responsive Design**: Mobile-friendly layout optimized for all devices.
- **Project Showcase**: specific sections to highlight GitHub projects, certifications, and technical skills.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Language**: TypeScript



## 📂 Project Structure

```
devops-portfolio/
├── public/              # Static assets (images, CV, icons)
├── src/
│   ├── app/             # Next.js App Router pages and layout
│   ├── components/
│   │   ├── stages/      # Individual pipeline stage components
│   │   │   ├── BuildStage.tsx
│   │   │   ├── CodeStage.tsx
│   │   │   ├── DeployStage.tsx
│   │   │   ├── MonitorStage.tsx
│   │   │   ├── OperateStage.tsx
│   │   │   ├── PlanStage.tsx
│   │   │   ├── ReleaseStage.tsx
│   │   │   └── TestStage.tsx
│   │   ├── DevOpsLoop.tsx      # Infinite loop animation component
│   │   ├── DevOpsPipeline.tsx  # Main pipeline orchestration component
│   │   └── WelcomeModal.tsx    # Initial welcome screen
│   └── ...
└── ...
```

## 🎨 Customization

- **Projects**: Edit `src/components/stages/DeployStage.tsx` to add your own projects.
- **Certifications**: Update `src/components/stages/OperateStage.tsx` with your credentials.
- **Skills**: Modify `src/components/stages/CodeStage.tsx` to reflect your tech stack.

## 📄 License

This project is licensed under the MIT License. Feel free to use it as a template for your own portfolio!

---

<p align="center">
  Built with ❤️ by Eden Sitkovetsky
</p>
