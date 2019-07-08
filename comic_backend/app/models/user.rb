class User < ApplicationRecord
    has_many :comics, through: :site
end
