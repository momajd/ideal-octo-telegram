Rails.application.routes.draw do
  namespace :api do
    resources :trusses, only: [:index, :create, :update, :destroy] do
      resources :nodes, :members, :materials, :sections, :loads, only: [:create, :update, :destroy, :show, :index]
    end
  end
end
