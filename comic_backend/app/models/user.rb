class User < ApplicationRecord
    has_many :sites
    has_many :comics, through: :sites
end
