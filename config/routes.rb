Rails.application.routes.draw do
  resources :bookings, only: %i(index create)
end
