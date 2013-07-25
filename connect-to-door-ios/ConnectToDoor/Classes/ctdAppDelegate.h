//
//  ctdAppDelegate.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdLoginViewController.h"
#import <FacebookSDK/FacebookSDK.h>
#import "ctdGlobal.h"
@class ctdViewController;

@interface ctdAppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) UIViewController *viewController;
@property (strong, nonatomic) UINavigationController *navigationController;
@property (nonatomic, strong) ctdGlobal *globals;

//facebook
@property (strong, nonatomic) FBSession *session;


- (void)releaseAllViewControllers;

@end
