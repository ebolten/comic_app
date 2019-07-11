class User < ApplicationRecord
    has_many :sites
    has_many :comics, through: :sites

    attr_accessor :user_comics

    def user_comics
        return self.comics
    end
end
