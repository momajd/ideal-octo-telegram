Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: {format: :json} do
    resources :trusses, only: [:index, :create, :update, :show, :destroy] do
      resources :members, :materials, :sections, only: [:create, :update, :destroy]

      resources :nodes, only: [:index, :create, :update, :show, :destroy] do
        resources :loads, only: [:index, :create, :update, :show, :destroy]
      end
    end
  end
end
