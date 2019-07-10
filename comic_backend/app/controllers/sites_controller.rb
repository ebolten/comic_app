class SitesController < ApplicationController

    def new
        @site = Site.new
    end

    def create
        @site = Site.find_or_create_by(site_params)
        render json: @site
    end

    private

    def site_params
        params.require(:site).permit(:user_id,:comic_id)
    end

end
