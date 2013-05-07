//
//  ctdLoginViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ctdLoginViewController : UIViewController<UITextFieldDelegate>{
    IBOutlet UITextField *userName;
    IBOutlet UITextField *password;
    IBOutlet UIButton *loginButton;
}

@property (nonatomic, weak) IBOutlet UITextField *userName;
@property (nonatomic, weak) IBOutlet UITextField *password;
@property (nonatomic, weak) IBOutlet UIButton *loginButton;


- (IBAction)didLoginButtonClicked:(id)sender;

@end
