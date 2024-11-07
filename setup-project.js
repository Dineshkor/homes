const fs = require('fs');
const path = require('path');

const projectStructure = {
  'src': {
    'app': {
      'layout.tsx': '',
      'page.tsx': '',
      'globals.css': '',
      '(auth)': {
        'login': {
          'page.tsx': ''
        },
        'register': {
          'page.tsx': ''
        },
        'forgot-password': {
          'page.tsx': ''
        }
      },
      'properties': {
        'page.tsx': '',
        '[id]': {
          'page.tsx': ''
        },
        'add': {
          'page.tsx': ''
        }
      },
      'agents': {
        'page.tsx': '',
        '[id]': {
          'page.tsx': ''
        }
      },
      'dashboard': {
        'layout.tsx': '',
        'page.tsx': '',
        'properties': {
          'page.tsx': ''
        },
        'favorites': {
          'page.tsx': ''
        },
        'messages': {
          'page.tsx': ''
        },
        'settings': {
          'page.tsx': ''
        }
      },
      'blog': {
        'page.tsx': '',
        '[slug]': {
          'page.tsx': ''
        }
      },
      'contact': {
        'page.tsx': ''
      }
    },
    'components': {
      'layout': {
        'Header.tsx': '',
        'Footer.tsx': '',
        'Navigation.tsx': '',
        'DashboardSidebar.tsx': ''
      },
      'home': {
        'HeroSection.tsx': '',
        'PopularCities.tsx': '',
        'HowItWorks.tsx': '',
        'Testimonials.tsx': '',
        'NewsletterSection.tsx': ''
      },
      'property': {
        'PropertyCard.tsx': '',
        'PropertyGrid.tsx': '',
        'PropertySearch.tsx': '',
        'PropertyFilters.tsx': '',
        'PropertyGallery.tsx': '',
        'PropertyMap.tsx': '',
        'PropertyFeatures.tsx': '',
        'PropertyContactForm.tsx': ''
      },
      'agent': {
        'AgentCard.tsx': '',
        'AgentGrid.tsx': '',
        'AgentProfile.tsx': '',
        'AgentContactForm.tsx': ''
      },
      'auth': {
        'LoginForm.tsx': '',
        'RegisterForm.tsx': '',
        'ForgotPasswordForm.tsx': ''
      },
      'dashboard': {
        'PropertyForm.tsx': '',
        'MessageList.tsx': '',
        'UserProfile.tsx': '',
        'Statistics.tsx': ''
      },
      'common': {
        'Button.tsx': '',
        'Input.tsx': '',
        'Select.tsx': '',
        'Modal.tsx': '',
        'Pagination.tsx': '',
        'LoadingSpinner.tsx': '',
        'ErrorMessage.tsx': ''
      }
    },
    'lib': {
      'prisma.ts': '',
      'auth.ts': '',
      'api.ts': '',
      'constants.ts': '',
      'utils.ts': ''
    },
    'types': {
      'property.ts': '',
      'user.ts': '',
      'agent.ts': '',
      'index.ts': ''
    },
    'hooks': {
      'useAuth.ts': '',
      'useProperties.ts': '',
      'useAgent.ts': '',
      'useForm.ts': ''
    },
    'config': {
      'site.ts': '',
      'navigation.ts': ''
    }
  },
  'public': {
    'images': {
      'hero': {},
      'properties': {},
      'agents': {},
      'cities': {}
    },
    'icons': {}
  },
  'prisma': {
    'schema.prisma': ''
  }
};

function createDirectoryStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = path.join(basePath, name);
    
    if (typeof content === 'object') {
      // Create directory
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath, { recursive: true });
      }
      createDirectoryStructure(currentPath, content);
    } else {
      // Create file
      if (!fs.existsSync(currentPath)) {
        fs.writeFileSync(currentPath, '');
      }
    }
  }
}

// Create the project structure
createDirectoryStructure('.', projectStructure);

console.log('Project structure created successfully!');