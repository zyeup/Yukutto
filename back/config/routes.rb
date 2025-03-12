Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get :health_check, to: 'health_check#index'
      resources :posts, only: [:index, :show, :create, :update, :destroy]
      resources :markers, only: [:index, :show, :create, :update, :destroy]
      resources :post_bookmarks, only: [:index, :create, :destroy], param: :post_id
      resources :users, only: [:index] do
        member do
          get 'following'
        end
      end
      resources :follows, only: [:create, :destroy]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end
