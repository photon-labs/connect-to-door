//
//  ctdSignInViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdLoginService.h"
#import "ctdBaseViewController.h"
@interface ctdSignInViewController : ctdBaseViewController<LoginServiceDelegate>{
    IBOutlet UITextField *employeeID;
    IBOutlet UIButton *continueButton;
}
@property (nonatomic, strong) IBOutlet UITextField *employeeID;
@property (nonatomic, strong) IBOutlet UIButton *continueButton;
- (IBAction)didContinueClicked:(id)sender;

@end
