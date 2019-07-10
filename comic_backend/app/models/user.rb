class User < ApplicationRecord
    has_many :comics, through: :site
    has_many :sites
end
