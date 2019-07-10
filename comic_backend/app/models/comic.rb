class Comic < ApplicationRecord
    has_many :users, through: :site
    has_many :sites
end
