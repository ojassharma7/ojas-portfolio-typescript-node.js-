'use client';

import { Box, Heading, Text, Button, VStack, HStack, Link, useColorMode, Image, SimpleGrid, List, ListItem, ListIcon, Tag, TagLabel, Collapse, Input, Textarea, Container } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaDatabase, FaCloud, FaRobot, FaTools, FaChartBar, FaBrain, FaCode, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState, useEffect, ReactNode, ChangeEvent, FormEvent } from 'react';
import Layout from '@/components/Layout';

const MotionBox = motion(Box);

const Highlight = ({ children }: { children: ReactNode }) => (
  <Box as="mark" bg="green.100" color="black" px={2} py={1} borderRadius="md" fontWeight="semibold">{children}</Box>
);

type SkillCategory = {
  category: string;
  icon: any;
  color: string;
  items: string[];
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  techStack: string[];
  responsibilities: string[];
};

type Project = {
  title: string;
  github: string;
  categories: string[];
  techStack: string[];
  description: string;
  details: string[];
};

const skillCategories: SkillCategory[] = [
  {
    category: 'Data Science & AI',
    icon: FaBrain,
    color: 'purple',
    items: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'LLMs', 'RAG', 'Vector DBs']
  },
  {
    category: 'Backend Development',
    icon: FaDatabase,
    color: 'blue',
    items: ['Python', 'Java', 'Node.js', 'Flask', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'MongoDB']
  },
  {
    category: 'Cloud & DevOps',
    icon: FaCloud,
    color: 'green',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring']
  },
  {
    category: 'Frontend Development',
    icon: FaCode,
    color: 'orange',
    items: ['React', 'Next.js', 'TypeScript', 'Chakra UI', 'Tailwind CSS', 'Redux', 'GraphQL']
  },
  {
    category: 'AI/ML Tools',
    icon: FaRobot,
    color: 'pink',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'LangChain', 'Pinecone', 'Weaviate']
  },
  {
    category: 'Data Engineering',
    icon: FaTools,
    color: 'teal',
    items: ['Apache Spark', 'Airflow', 'Kafka', 'Elasticsearch', 'Redis', 'Data Warehousing', 'ETL']
  }
];

const experiences: Experience[] = [
  {
    company: 'Center Of Gambling Studies, Rutgers University',
    role: 'Data Scientist',
    period: 'April 2024 - Present',
    location: 'New Brunswick, NJ',
    techStack: ['Python', 'Machine Learning', 'Clustering', 'A/B Testing', 'Statistical Analysis', 'Data Visualization'],
    responsibilities: [
      'Conducting extensive data analysis on a 4.5 TB dataset encompassing 13.6 billion records from seven gambling operators to identify high-risk gambling behaviors and develop predictive models for early intervention',
      'Built and deployed data-driven risk assessment models like K-Means & GMM clustering models to classify 1M+ gamblers based on behavioral indicators, achieving a Silhouette Score of 0.79',
      'Applied A/B testing with multi-class models (SVM, LightGBM, CatBoost) to improve risk classification of gamblers, boosting intervention accuracy by 33%',
      'Developed an outlier detection pipeline using Z-Score, IQR filtering, and PCA (99% variance retained) to detect irregular deposit patterns',
      'Results drove a 30% increase in early detection of risky financial behavior, informing state-level policy and modeling financial risk indicators across multi-billion-dollar transaction datasets'
    ]
  },
  {
    company: 'Omalco Extrusion',
    role: 'Data Analyst',
    period: 'August 2022 - July 2023',
    location: 'New Delhi, India',
    techStack: ['Power BI', 'D3.js', 'PostgreSQL', 'Couchbase', 'Python', 'ARIMA', 'Prophet'],
    responsibilities: [
      'Automated financial reporting and market analysis with Power BI and D3.js, improving business team efficiency by 80% and reducing ETL job runtime by 50%',
      'Integrated real-time data pipelines for dynamic market analysis and implemented time-series forecasting algorithms like ARIMA and Prophet models',
      'Implemented hybrid data architectures and real-time dashboards using PostgreSQL, Couchbase and D3.js',
      'Conducted statistical analysis using linear regression and hypothesis testing to uncover key trends like price elasticity trends, seasonal demand fluctuations, & profitability shifts'
    ]
  }
];

const projects: Project[] = [
  {
    title: 'Advanced RAG Pipeline for Question Answering',
    github: 'https://github.com/ojassharma7/RAG-Based-LLM-Application',
    categories: ['AI', 'Backend'],
    techStack: ['LLaMA 3', 'LangChain', 'Hugging Face Transformers', 'FAISS', 'PyTorch', 'FastAPI'],
    description: 'A high-performance Retrieval-Augmented Generation (RAG) system integrating LLaMA 3, LangChain, and FAISS for improved question answering.',
    details: [
      'Developed a high-performance RAG system improving response accuracy by 70% while optimizing retrieval efficiency',
      'Engineered a low-latency document retrieval pipeline, leveraging vector search with FAISS and optimized nearest neighbor lookup, reducing query time from 90 ms to 30 ms (~80% speedup)',
      'Enhanced system reliability through GitHub Actions, CI/CD pipelines, enabling automated deployment and model performance tracking',
      'Built and deployed an API-based interface using FastAPI, enabling efficient querying and interaction with the RAG system'
    ]
  },
  {
    title: 'LLM-Powered Product Recommendations',
    github: 'https://github.com/ojassharma7/LLM-Recommendation-System',
    categories: ['AI', 'ML'],
    techStack: ['PyTorch', 'HuggingFace', 'RAG', 'Quantized Low-Rank Adaptation', 'NLP', 'Prompt Engineering'],
    description: 'A sophisticated product recommendation system using fine-tuned LLMs for accurate purchase predictions.',
    details: [
      'Fine-tuned LLMs (Mistral-7B, TinyLlama) for product recommendation using Amazon Review Dataset',
      'Achieved 98%+ accuracy in next-purchase prediction through novel prompting and efficient fine-tuning (LoRA, QLoRA)',
      'Implemented advanced NLP techniques for better understanding of product descriptions and user preferences',
      'Optimized model performance through careful prompt engineering and parameter tuning'
    ]
  },
  {
    title: 'Comparative Analysis of RAG Techniques',
    github: 'https://github.com/ojassharma7/RAG-TECHNIQUES',
    categories: ['AI', 'Research'],
    techStack: ['Python', 'RAG', 'Evaluation Metrics', 'Performance Analysis'],
    description: 'A comprehensive study comparing different RAG architectures and their performance characteristics.',
    details: [
      'Conducted end-to-end evaluation across latency, coherence, and accuracy to determine optimal RAG structure',
      'Evaluated multiple RAG approaches across accuracy, latency, and coherence determining Hybrid RAG as the most effective',
      'Identified key trade-offs in retrieval methods, optimizing contextual relevance while reducing hallucinations',
      'Developed standardized evaluation metrics for comparing different RAG implementations'
    ]
  },
  {
    title: 'Campus Watch Crime Analytics',
    github: 'https://github.com/ojassharma7/Rutgers-Crime-Campus-Watch-Dash-App',
    categories: ['Data Engineering', 'Visualization'],
    techStack: ['Python', 'Selenium', 'Plotly', 'Data Visualization', 'Web Scraping'],
    description: 'A real-time interactive dashboard for analyzing campus crime patterns and trends.',
    details: [
      'Developed a real-time interactive dashboard to analyze campus crime patterns using daily data scraped from SpotCrime via Selenium-based automated pipeline',
      'Implemented Plotly library to craft interactive charts and geospatial maps, significantly enhancing the user experience with rich data visualizations',
      'Demonstrated ability to blend data engineering, visualization, and automation to solve public safety analytics problems',
      'Created a scalable solution that mirrors customer-facing use cases in banking dashboards and fraud detection systems'
    ]
  }
];

const categories = ['All', 'Frontend', 'Backend', 'AI', 'Cloud', 'DevOps'];

export default function Home() {
  const { colorMode } = useColorMode();
  const [expandedExp, setExpandedExp] = useState<boolean[]>(Array(experiences.length).fill(false));
  const [expandedProj, setExpandedProj] = useState<boolean[]>(Array(projects.length).fill(false));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });
  const [contactToast, setContactToast] = useState<boolean>(false);

  // Ensure toggle state always matches data length
  useEffect(() => {
    setExpandedExp(Array(experiences.length).fill(false));
  }, [experiences.length]);
  useEffect(() => {
    setExpandedProj(Array(projects.length).fill(false));
  }, [projects.length]);

  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((p) => p.categories.includes(selectedCategory));

  const handleToggleExp = (idx: number) => {
    setExpandedExp(prev => {
      const newState = [...prev];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  const handleToggleProj = (idx: number) => {
    setExpandedProj(prev => {
      const newState = [...prev];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    setContactToast(true); 
    setFormData({ name: '', email: '', message: '' }); 
    setTimeout(() => setContactToast(false), 3000); 
  };

  return (
    <Layout>
      <Box as="section" id="home" minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4} bgGradient={colorMode === 'light' ? 'linear(to-br, gray.50, purple.50, white)' : 'linear(to-br, gray.900, purple.900, gray.800)'}>
        <MotionBox
          p={{ base: 6, md: 12 }}
          borderRadius="2xl"
          boxShadow="2xl"
          bg={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.800'}
          maxW="2xl"
          w="full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            mb={4}
            bgGradient="linear(to-r, purple.500, pink.400)"
            bgClip="text"
            letterSpacing="tight"
          >
            Ojas Sharma, M.S.
          </Heading>
          <Heading
            as="h2"
            size="lg"
            fontWeight="semibold"
            mb={4}
            color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
          >
            Data Scientist & AI Engineer
          </Heading>
          <Text fontSize="lg" mb={2} color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
            I believe in solving problems <Box as="span" bg={colorMode === 'light' ? 'green.100' : 'green.700'} px={2} borderRadius="md" display="inline">at scale</Box>.<br/>
            ML, Data, Cloud, and AI? I'm in! I Learn. I Implement.
          </Text>
          <Text fontSize="md" mb={6} color={colorMode === 'light' ? 'blue.600' : 'blue.300'}>
            Know more <Link href="#about" color="inherit" textDecoration="underline">About Me</Link> and <Link href="#skills" color="inherit" textDecoration="underline">My Skills</Link>.
          </Text>
          <Text fontWeight="bold" mb={2}>
            Currently open to Data Science/AI roles for 2024.
          </Text>
          <Text fontSize="md" mb={6}>
            ojassharma16@gmail.com | (929) 684-7733
          </Text>
          <HStack spacing={4} mb={2} justify="center">
            <Link href="https://github.com/ojassharma7" isExternal>
              <Button leftIcon={<FaGithub />} variant="outline" colorScheme="purple" _hover={{ bg: 'purple.100', transform: 'translateY(-2px)', boxShadow: 'md' }}>
                GitHub
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/ojassharma16" isExternal>
              <Button leftIcon={<FaLinkedin />} variant="outline" colorScheme="purple" _hover={{ bg: 'purple.100', transform: 'translateY(-2px)', boxShadow: 'md' }}>
                LinkedIn
              </Button>
            </Link>
            <Link href="/Resume_Ojas_Sharma.pdf" target="_blank" rel="noopener noreferrer" download>
              <Button colorScheme="purple" variant="solid" size="md" _hover={{ bg: 'purple.600', transform: 'scale(1.05)', boxShadow: 'lg' }}>
                Download Resume
              </Button>
            </Link>
          </HStack>
        </MotionBox>
      </Box>

      <Box as="section" id="about" py={24}>
        <Box maxW="6xl" mx="auto" w="full" bg={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.800'} boxShadow="2xl" borderRadius="2xl" p={{ base: 4, md: 16 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box bg={colorMode === 'light' ? 'white' : 'gray.900'} borderRadius="2xl" p={3} boxShadow="2xl" display="inline-block">
                <Image src="/profile.jpg" alt="Ojas Sharma" borderRadius="2xl" boxSize={{ base: '180px', md: '260px', lg: '300px' }} objectFit="cover" />
              </Box>
            </Box>
            <VStack align="start" spacing={6}>
              <Heading as="h1" size="2xl" color={colorMode === 'light' ? 'gray.800' : 'white'}>About Me</Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                Hello! I am <b>Ojas Sharma</b>, a Data Scientist at the Center of Gambling Studies, Rutgers University. I graduated with a Master's in Statistics - Data Science from Rutgers University, New Brunswick in May 2025.
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} w="full">
                <HStack><FaBirthdayCake color="#D69E2E" /><Text fontSize="md"><b>Birthday:</b> 16 Oct 2001</Text></HStack>
                <HStack><FaGithub color="#6B46C1" /><Text fontSize="md"><b>GitHub:</b> <Link href="https://github.com/ojassharma7" color="purple.500" isExternal>ojassharma7</Link></Text></HStack>
                <HStack><FaPhone color="#38A169" /><Text fontSize="md"><b>Phone:</b> +1 929-684-7733</Text></HStack>
                <HStack><FaMapMarkerAlt color="#DD6B20" /><Text fontSize="md"><b>Location:</b> New Brunswick, NJ, USA</Text></HStack>
                <HStack><FaEnvelope color="#3182CE" /><Text fontSize="md"><b>Email:</b> <Link href="mailto:ojassharma16@gmail.com" color="purple.500">ojassharma16@gmail.com</Link></Text></HStack>
              </SimpleGrid>
              <Box mt={2} mb={2}>
                <Tag size="lg" colorScheme="purple" variant="solid" px={4} py={2} fontWeight="bold" fontSize="md">
                  Available for: Data Science/ MLE/ AI Spring'25 internship and May'25 full-time opportunities.
                </Tag>
              </Box>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                I have 2 years of experience across internships and as a research assistant in Data Analytics and Data Science, specializing in large-scale data analysis, machine learning, and AI-driven solutions.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                Currently, I work at Rutgers University's Center for Gambling Studies, analyzing 4.5TB+ datasets to identify predictive behavioral trends in problem gambling. My expertise includes leveraging PySpark, SQL, and advanced ML models (XGBoost, Isolation Forest) to detect high-risk gambling patterns with 90%+ accuracy.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                In the realm of AI, I specialize in <b>Large Language Models (LLMs)</b> and <b>Retrieval-Augmented Generation (RAG)</b>, focusing on building intelligent systems, optimizing information retrieval, and developing advanced model pipelines.
              </Text>
              <Box w="full" bg={colorMode === 'light' ? 'gray.50' : 'gray.700'} borderRadius="lg" p={4} boxShadow="md">
                <List spacing={2} fontSize={{ base: 'md', md: 'lg' }}>
                  <ListItem><b>LLMs & RAG:</b> Expertise in multi-agent orchestration, fine-tuning models, and enhancing retrieval-based AI workflows.</ListItem>
                  <ListItem><b>Databases & Storage:</b> Skilled in Vector Databases, NoSQL (MongoDB, DynamoDB), and Relational Databases (PostgreSQL, MySQL) for scalable AI applications.</ListItem>
                  <ListItem><b>Quantitative Finance:</b> Strong foundation in statistical modeling, financial time series analysis, and machine learning for quantitative strategies.</ListItem>
                </List>
              </Box>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                I am passionate about AI-driven innovation, large-scale data processing, and real-world applications of ML & Quantitative Research. My recent work focuses on LLMs, Retrieval-Augmented Generation (RAG), and AI system orchestration.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
                Let's connect and explore new opportunities in Data Science, Quant Research, and AI Innovation!
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </Box>

      <Box as="section" id="skills" py={24}>
        <Box w="full" px={{ base: 2, md: 8, lg: 16 }}>
          <Heading as="h1" size="2xl" mb={10} bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text" fontWeight="extrabold" textAlign="left">Skills & Expertise</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {skillCategories.map((group, idx) => (
              <Box key={group.category} p={8} borderRadius="xl" boxShadow="lg" bg={colorMode === 'light' ? 'white' : 'gray.700'}>
                <HStack mb={4} spacing={3}>
                  <Box as={group.icon} color={`${group.color}.400`} boxSize={7} />
                  <Heading as="h3" size="lg" color={colorMode === 'light' ? 'gray.800' : 'white'} fontFamily="mono">{group.category}</Heading>
                </HStack>
                <Box display="flex" flexWrap="wrap" gap={3}>
                  {group.items.map((skill) => (
                    <Tag key={skill} size="lg" variant="subtle" colorScheme={group.color} borderRadius="md" px={4} py={2} fontWeight="semibold" fontSize="md">{skill}</Tag>
                  ))}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Box as="section" id="experience" py={24}>
        <Box maxW="4xl" mx="auto" w="full" bg={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.800'} boxShadow="2xl" borderRadius="2xl" p={{ base: 4, md: 12 }}>
          <Heading as="h1" size="2xl" mb={10} bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text" fontWeight="extrabold" textAlign="left">Experience</Heading>
          <VStack spacing={10} align="stretch">
            {experiences.map((exp, idx) => (
              <Box key={exp.company} p={{ base: 4, md: 7 }} borderRadius="xl" boxShadow="lg" bg={colorMode === 'light' ? 'white' : 'gray.700'} mb={2}>
                <Heading as="h2" size="lg" mb={1} fontWeight="bold" color={colorMode === 'light' ? 'gray.800' : 'white'}>{exp.company}</Heading>
                <Text fontSize="xl" fontWeight="semibold" mb={1} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>{exp.role}</Text>
                <Text fontSize="md" mb={1} color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>{exp.period}</Text>
                <Text fontSize="md" mb={3} color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>{exp.location}</Text>
                <Text fontWeight="bold" fontSize="md" mb={2} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>Tech Stack:</Text>
                <HStack spacing={2} mb={3} flexWrap="wrap">
                  {exp.techStack.map((tech) => (
                    <Tag key={tech} size="md" variant="subtle" colorScheme="purple" borderRadius="md" px={3} py={1} boxShadow="sm" fontWeight="semibold"><TagLabel fontSize="md">{tech}</TagLabel></Tag>
                  ))}
                </HStack>
                <Button 
                  onClick={() => handleToggleExp(idx)} 
                  size="sm" 
                  variant="link" 
                  colorScheme="blue" 
                  mb={2} 
                  rightIcon={expandedExp[idx] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  {expandedExp[idx] ? 'Show Less' : 'Show More'}
                </Button>
                <Collapse in={expandedExp[idx]} animateOpacity>
                  <Box mt={2}>
                    <Text fontWeight="bold" mb={1} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>Key Responsibilities:</Text>
                    <List styleType="disc" pl={6} spacing={2}>
                      {exp.responsibilities.map((resp, i) => (
                        <ListItem key={i} fontSize="md" color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>{resp}</ListItem>
                      ))}
                    </List>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      <Box as="section" id="projects" py={24}>
        <Box maxW="5xl" mx="auto" w="full" bg={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.800'} boxShadow="2xl" borderRadius="2xl" p={{ base: 4, md: 12 }}>
          <Heading as="h1" size="2xl" mb={8} bgGradient="linear(to-r, purple.500, pink.400)" bgClip="text" fontWeight="extrabold" textAlign="left">Projects</Heading>
          <HStack spacing={2} mb={8} flexWrap="wrap">
            {categories.map((cat) => (
              <Button key={cat} size="sm" variant={selectedCategory === cat ? 'solid' : 'outline'} colorScheme="purple" onClick={() => setSelectedCategory(cat)} borderRadius="md" fontWeight="semibold">{cat}</Button>
            ))}
          </HStack>
          <VStack spacing={8} align="stretch">
            {filteredProjects.map((project, idx) => (
              <Box key={project.title} borderWidth={2} borderColor={colorMode === 'light' ? 'blue.200' : 'blue.600'} borderRadius="xl" boxShadow="md" p={6} bg={colorMode === 'light' ? 'white' : 'gray.900'} transition="box-shadow 0.2s" _hover={{ boxShadow: 'xl' }}>
                <Heading as="h2" size="md" mb={2} fontWeight="bold" color={colorMode === 'light' ? 'gray.800' : 'white'}>{project.title}</Heading>
                <Button as="a" href={project.github} target="_blank" size="sm" colorScheme="gray" variant="outline" leftIcon={<FaGithub />} mb={3} fontWeight="semibold">View on GitHub</Button>
                <HStack spacing={2} mb={3} flexWrap="wrap">
                  {project.techStack.map((tech) => (
                    <Tag key={tech} size="md" variant="subtle" colorScheme="gray" borderRadius="md" px={3} py={1} fontWeight="semibold"><TagLabel fontSize="md">{tech}</TagLabel></Tag>
                  ))}
                </HStack>
                <Button 
                  onClick={() => handleToggleProj(idx)} 
                  size="sm" 
                  variant="link" 
                  colorScheme="blue" 
                  mb={2} 
                  rightIcon={expandedProj[idx] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  {expandedProj[idx] ? 'Show Less' : 'Show More'}
                </Button>
                <Collapse in={expandedProj[idx]} animateOpacity>
                  <Box mt={2}>
                    <Text fontSize="md" mb={2} color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>{project.description}</Text>
                    <List styleType="disc" pl={6} spacing={2}>
                      {project.details.map((detail, i) => (
                        <ListItem key={i} fontSize="md" color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>{detail}</ListItem>
                      ))}
                    </List>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      <Box as="section" id="contact" py={24}>
        <Container maxW="container.xl" py={20}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading as="h1" size="2xl" mb={6} color={colorMode === 'light' ? 'purple.600' : 'purple.200'}>Get in Touch</Heading>
              <Text fontSize="lg" mb={8}>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</Text>
              <HStack spacing={4} mb={8}>
                <Link href="mailto:ojassharma16@gmail.com" isExternal><Button leftIcon={<FaEnvelope />} colorScheme="purple" variant="outline">Email</Button></Link>
                <Link href="https://www.linkedin.com/in/ojassharma16" isExternal><Button leftIcon={<FaLinkedin />} colorScheme="purple" variant="outline">LinkedIn</Button></Link>
                <Link href="https://github.com/ojassharma7" isExternal><Button leftIcon={<FaGithub />} colorScheme="purple" variant="outline">GitHub</Button></Link>
                <Link href="tel:+19296847733" isExternal><Button leftIcon={<FaPhone />} colorScheme="purple" variant="outline">Phone</Button></Link>
                <Link href="https://maps.google.com/?q=New+Brunswick,+NJ" isExternal><Button leftIcon={<FaMapMarkerAlt />} colorScheme="purple" variant="outline">Location</Button></Link>
              </HStack>
              <Box as="form" onSubmit={handleContactSubmit} p={6} borderRadius="lg" bg={colorMode === 'light' ? 'white' : 'gray.700'} boxShadow="md">
                <VStack spacing={4}>
                  <Input placeholder="Your Name" value={formData.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} required />
                  <Input type="email" placeholder="Your Email" value={formData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} required />
                  <Textarea placeholder="Your Message" value={formData.message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })} required rows={6} />
                  <Button type="submit" colorScheme="purple" size="lg" width="full">Send Message</Button>
                  {contactToast && <Text color="green.500">Message sent! I'll get back to you soon.</Text>}
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
