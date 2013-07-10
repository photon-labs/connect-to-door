//
//  ctdLoginViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FacebookSDK/FacebookSDK.h>

@interface ctdLoginViewController : UIViewController<UITextFieldDelegate>{
    IBOutlet UIButton *loginButton;
}


@property (nonatomic, strong) IBOutlet UIButton *loginButton;


- (IBAction)didLoginButtonClicked:(id)sender;

@end
