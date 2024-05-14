Rage.routes.draw do
  resources :bookings, only: %i(index create)
end
