package database;

import com.google.inject.AbstractModule;

/**
 * Created by Andreas on 27.05.2017.
 */
public class Startup extends AbstractModule {

    @Override
    protected void configure(){
        //Tells the system to only have one instance of DBSetup and to run it's constructor onStartup
        bind(DbSetup.class).asEagerSingleton();
    }

}
