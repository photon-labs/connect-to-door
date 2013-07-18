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
}

- (IBAction)didContinueClicked:(id)sender;

@end
