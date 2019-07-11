class SitesController < ApplicationController

    def index
        @sites = Site.all
        render json: @sites

    end

    def show
        @site = Site.find(params['id'])
        render json: @site
    end

    def new
        @site = Site.new
    end

    def create
        @site = Site.find_or_create_by(site_params)
        render json: @site

        @comic = Comic.find_by(title:params['comic_title'])

    end

    private

    def site_params
        params.require(:site).permit(:user_id,:comic_id)
    end

end
