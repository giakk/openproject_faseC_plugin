module OpenProject
  module FaseCPlugin
    class Engine < ::Rails::Engine
      engine_name :openproject_fase_c_plugin

      include OpenProject::Plugins::ActsAsOpEngine

      register 'openproject-fase_c_plugin',
               author_url: 'https://github.com/yourusername',
               bundled: false do
        
        project_module :fase_c_module do
          permission :view_fase_c_data,
                     { fase_c_data: [:show] },
                     permissible_on: :project,
                     contract_actions: { fase_c_data: [:show] }
          
          permission :edit_fase_c_data,
                     { fase_c_data: [:update] },
                     permissible_on: :project,
                     contract_actions: { fase_c_data: [:update] },
                     require: :member
        end

        menu :project_menu,
             :fase_c_data,
             { controller: '/fase_c_data', action: 'show' },
             caption: 'Fase C',
             after: :gantt,
             icon: 'check-circle',
             if: ->(project) { 
               project.module_enabled?(:fase_c_module)
             }
      end

      config.before_configuration do |app|
        app.config.paths['config/locales'] << File.expand_path('../../../config/locales', __dir__)
      end

      initializer 'fase_c_plugin.append_migrations' do |app|
        unless app.root.to_s.match?(root.to_s)
          config.paths['db/migrate'].expanded.each do |expanded_path|
            app.config.paths['db/migrate'] << expanded_path
          end
        end
      end

      config.to_prepare do
        # Aggiungi patches se necessario
      end
    end
  end
end