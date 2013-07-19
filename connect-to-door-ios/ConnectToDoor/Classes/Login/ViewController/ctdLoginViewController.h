//
//  ctdLoginViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FacebookSDK/FacebookSDK.h>
#import "ctdBaseViewController.h"

@interface ctdLoginViewController : ctdBaseViewController<UITextFieldDelegate>{
    IBOutlet UIButton *loginButton;
}


@property (nonatomic, strong) IBOutlet UIButton *loginButton;


- (IBAction)didLoginButtonClicked:(id)sender;

@end
