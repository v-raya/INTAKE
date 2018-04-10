FROM cwds/intake_base_image:latest
ENV APP_HOME /ca_intake
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ENV DISPLAY :1
ENV BUNDLE_PATH /ruby_gems
