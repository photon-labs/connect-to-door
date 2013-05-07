//
//  ctdAppDelegate.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdLoginViewController.h"

@class ctdViewController;

@interface ctdAppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) ctdLoginViewController *viewController;
@property (strong, nonatomic) UINavigationController *navigationController;


@end
