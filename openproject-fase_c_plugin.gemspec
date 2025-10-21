
Gem::Specification.new do |s|
  s.name        = "openproject-fase_c_plugin"
  s.version     = "1.0.0"
  s.authors     = ["Riccardo Giacchino"]
  s.email       = ["giacchinoriccardo@outlook.it"]
  s.summary     = "Plugin per gestire dati Fase C dei progetti"
  s.description = "Gestisce i dati di certificazione e collaudo per ogni progetto"
  s.license     = "GPLv3"

  s.files = Dir["{app,config,db,lib,frontend}/**/*"] + %w(README.md)
  
  s.add_dependency "rails", "~> 7.0"
end