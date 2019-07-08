class Comic < ApplicationRecord
    has_many :users, through: :site
end
