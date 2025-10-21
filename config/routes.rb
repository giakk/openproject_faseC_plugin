OpenProject::Application.routes.draw do
  scope 'projects/:project_id', as: 'project' do
    resource :fase_c_data, 
             controller: 'fase_c_data',
             only: [:show, :update]
  end
end