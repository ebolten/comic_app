class Comic < ApplicationRecord
    has_many :sites
    has_many :users, through: :sites
end
