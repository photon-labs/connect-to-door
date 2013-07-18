//
//  ctdAppDelegate.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdAppDelegate.h"
#import "Reachability.h"
#import "ctdSignInViewController.h"

@implementation ctdAppDelegate
@synthesize window;
@synthesize navigationController;
@synthesize viewController;
@synthesize globals = _globals;

//facebook
@synthesize session = _session;

//facebook
/*- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    // attempt to extract a token from the url
    return [FBAppCall handleOpenURL:url
                  sourceApplication:sourceApplication
                        withSession:self.session];
}*/


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     [self setupReachabilityChecks];
    
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    
    [self setRootController];
    
    self.navigationController = [[UINavigationController alloc] initWithRootViewController:self.viewController];
    
    [self.window setRootViewController:self.navigationController];
    [self.window makeKeyAndVisible];
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    //close session facebook
    [self.session close];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    //check session token
    [FBAppCall handleDidBecomeActiveWithSession:self.session];
}

/*
 *aldi_p
 *open check connection
 *
 */
- (void)setupReachabilityChecks {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(reachabilityChanged:)
                                                 name:kReachabilityChangedNotification
                                               object:nil];
    // Allocate a reachability object.
    NSURL *urlObject = [[NSURL alloc] initWithString:@"http://www.google.com"];
    Reachability *reach = [Reachability reachabilityWithHostname:urlObject.host];
    
    // set the blocks
    reach.reachableBlock = ^(Reachability *reach) {
        _globals.isOffline = NO;
    };
    
    reach.unreachableBlock = ^(Reachability *reach) {
#if DEBUG
        NSLog(@"Exception:\nName:%@\nDescription:%@\nReason:%@", @"Reachability", @"Unable to reach the host.", @"The device may be disconnected from network access.");
#endif
        _globals.isOffline = YES;
    };
    
    // start the notifier which will cause the reachability object to retain itself!
    [reach startNotifier];
}

/*
 *aldi_p
 */
-(void)reachabilityChanged:(NSNotification*)note
{
    Reachability * reach = [note object];
    //WiFi
    if ([reach isReachableViaWiFi])
    {
        NSLog(@"Wifi On");
        _globals.isWifiOn = YES;
    }else{
        NSLog(@"Wifi Off");
        _globals.isWifiOn = NO;
    }
    if([reach isReachable])
    {
        NSLog(@"online");
        _globals.isOffline = NO;
    }
    else
    {
        NSLog(@"down");
        _globals.isOffline = YES;
    }
}

- (void)setRootController{
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    if (!appDelegate.session.isOpen) {
        NSLog(@"masuk !appDelegate.session.isOpen");
        // create a fresh session object
        appDelegate.session = [[FBSession alloc] init];
        NSLog(@"session state : %i", appDelegate.session.state);
        // if we don't have a cached token, a call to open here would cause UX for login to
        // occur; we don't want that to happen unless the user clicks the login button, and so
        // we check here to make sure we have a token before calling open
        if (appDelegate.session.state == FBSessionStateCreatedTokenLoaded) {
            NSLog(@"masuk appDelegate.session.state == FBSessionStateCreatedTokenLoaded");
            // even though we had a cached token, we need to login to make the session usable
            [appDelegate.session openWithCompletionHandler:^(FBSession *session,
                                                             FBSessionState status,
                                                             NSError *error) {
                
                NSLog(@"masuk openWithCompletionHandler");
                // we recurse here, in order to update buttons and labels
                self.viewController = [[ctdSignInViewController alloc] initWithNibName:@"ctdSignInViewController" bundle:nil];
            }];
        }else{
            self.viewController = [[ctdLoginViewController alloc] initWithNibName:@"ctdLoginViewController" bundle:nil];
        }
    }else{
        self.viewController = [[ctdLoginViewController alloc] initWithNibName:@"ctdLoginViewController" bundle:nil];
    }
}

@end
