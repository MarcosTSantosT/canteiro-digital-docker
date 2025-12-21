import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Briefcase, AlertTriangle, Database } from 'lucide-react';
import ResizablePanel from './ResizablePanel';
import './WelcomePanel.css';

const WelcomePanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Search,
      iconColor: '#3b82f6',
      title: 'Pesquisar Operação',
      description: 'Busque operações específicas pelo número do convênio SIAFI. Visualize dados detalhados, comentários e histórico de alterações de cada operação.',
      features: [
        'Busca rápida por número de convênio',
        'Visualização completa dos dados',
        'Histórico de comentários',
        'Registro de alterações'
      ]
    },
    {
      icon: Briefcase,
      iconColor: '#8b5cf6',
      title: 'Carteira Completa',
      description: 'Acesse a lista completa de todas as operações da sua carteira. Filtre, ordene e encontre rapidamente as informações que precisa.',
      features: [
        'Tabela com todas as operações',
        'Filtros por coluna',
        'Ordenação customizável',
        'Colunas redimensionáveis'
      ]
    },
    {
      icon: AlertTriangle,
      iconColor: '#f59e0b',
      title: 'Visualizar Alterações',
      description: 'Acompanhe o histórico completo de alterações realizadas nas operações. Veja o que mudou, quando mudou e compare valores anteriores com os atuais.',
      features: [
        'Histórico completo de mudanças',
        'Comparação antes/depois',
        'Data e hora das alterações',
        'Filtros avançados'
      ]
    },
    {
      icon: Database,
      iconColor: '#10b981',
      title: 'Atualizar Base de Dados',
      description: 'Mantenha seus dados sempre atualizados. Sincronize informações com as fontes externas e garanta a precisão dos dados da sua carteira.',
      features: [
        'Sincronização automática',
        'Atualização sob demanda',
        'Validação de dados',
        'Log de atualizações'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <ResizablePanel className="full-height">
      <div className="welcome-panel">
        
        {/* Carrossel */}
        <div className="carousel-container">
          
          {/* Card do slide atual */}
          <div className="carousel-card">
            
            {/* Ícone */}
            <div 
              className="carousel-icon-wrapper"
              style={{ backgroundColor: `${slides[currentSlide].iconColor}15` }}
            >
              <CurrentIcon 
                size={64} 
                style={{ color: slides[currentSlide].iconColor }}
              />
            </div>

            {/* Conteúdo */}
            <div className="carousel-content">
              <h2 className="carousel-title">{slides[currentSlide].title}</h2>
              <p className="carousel-description">{slides[currentSlide].description}</p>
              
              {/* Lista de features */}
              <ul className="carousel-features">
                {slides[currentSlide].features.map((feature, index) => (
                  <li key={index} className="carousel-feature-item">
                    <span className="feature-bullet">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Controles de navegação */}
          <div className="carousel-controls">
            
            {/* Botão anterior */}
            <button 
              className="carousel-button carousel-button-prev"
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Indicadores (dots) */}
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Botão próximo */}
            <button 
              className="carousel-button carousel-button-next"
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              <ChevronRight size={24} />
            </button>

          </div>

          {/* Contador de slides */}
          <div className="carousel-counter">
            {currentSlide + 1} de {slides.length}
          </div>

        </div>

      </div>
    </ResizablePanel>
  );
};

export default WelcomePanel;
