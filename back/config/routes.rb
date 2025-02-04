Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
      resources :markers, only: [:index, :show, :create, :update, :destroy]
      resources :post_bookmarks, only: [:create, :destroy], param: :post_id
      resources :user_bookmarks, only: [:index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end
