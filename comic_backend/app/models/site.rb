class Site < ApplicationRecord
    belongs_to :users
    belongs_to :comic
end
